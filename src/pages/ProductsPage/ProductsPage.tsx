import { useEffect, useState, useMemo, type FC } from 'react';
import {
    Button,
    Flex,
    Form,
    Input,
    Modal,
    Pagination,
    Table, 
    Typography,
    notification,
    type PaginationProps 
} from 'antd';
import {
    ReloadOutlined, 
    PlusCircleOutlined, 
    SearchOutlined 
} from '@ant-design/icons';
import debounce from 'lodash.debounce';

import type { FilterValue, SorterResult, TablePaginationConfig } from 'antd/es/table/interface';
import ProductForm from '../../components/ProductForm/ProductForm';
import { useGetProductsQuery, useGetProductCategoriesQuery } from '../../api/productsApi'
import { type Product, type SortState } from '../../types/products';

import { PAGE_SIZE, columns } from './consts';
import './styles.css';

const ProductsPage: FC = () => {
    const [page, setPage] = useState<number>(1);
    const [search, setSearch] = useState<string>('');
    const [sort, setSort] = useState<SortState | undefined>(undefined)
    const [open, setOpen] = useState<boolean>(false);
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();

    const { data, isLoading, isFetching, refetch } = useGetProductsQuery({
        skip: (page - 1) * PAGE_SIZE,
        limit: PAGE_SIZE,
        search,
        sort
    });

    const { data: categories } = useGetProductCategoriesQuery();

    const items: Product[] = useMemo(() => {
        return data?.products ?? [];
    }, [data])

    const total: number = useMemo(() => {
        return data?.total ?? 0;   
    }, [data?.total])

    const handlePageChange: PaginationProps['onChange'] = (newPage) => {
        setPage(newPage);
    };

    const debouncedSearch = useMemo(() => debounce((value: string) => {
          setSearch(value);
        }, 500),
        [setSearch]
      );

    const handleSearchChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const value = ev.target.value;
        debouncedSearch(value);
    }

    const handleTableChange = (
        _: TablePaginationConfig,
        __: Record<string, FilterValue | null>,
        sorter: SorterResult<Product> | SorterResult<Product>[]
      ) => {
        if (!Array.isArray(sorter)) {
          if (sorter.field && sorter.order) {
            setSort({
              sortBy: sorter.field as string,
              order: sorter.order === 'ascend' ? 'asc' : 'desc'
            });
          } else {
            setSort(undefined);
          }
        }
      };

    useEffect(() => {
        refetch();
    }, [page, search, sort, refetch])

    const showModal = () => {
        setOpen(true);
    }

    const handleCancel = () => {
        form.resetFields();
        setOpen(false);
    }

    const handleOk = () => {
        form.submit();
    }

    const handleFormSubmit = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
            form.resetFields();
            api.success({
                message: 'Успех',
                description: 'Товар успешно добавлен'
            })
        }, 2000)
    }

    return (
        <div className='products-page'>
            {contextHolder}
            <Modal
                title='Добавление товара'
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                mask={{
                    blur: true
                }}
                cancelText='Отменить'
                okText='Сохранить'
            >
                <ProductForm 
                    onSubmit={handleFormSubmit} 
                    form={form} 
                    categories={categories ?? []} 
                />
            </Modal>
            <Flex justify='space-between' align='center' className='products-page__container'>
                <Typography.Title level={1} style={{ minWidth: '25%', margin: '0' }}>Товары</Typography.Title>
                <Input 
                    placeholder='Найти' 
                    prefix={<SearchOutlined />} 
                    variant='filled'
                    size='large'
                    onChange={handleSearchChange}
                />
                <div style={{ minWidth: '25%' }} />
            </Flex>
            <Flex orientation='vertical' className='products-page__container' gap={32}>
                <Flex justify='space-between' align='flex-start'>
                    <Typography.Title level={3}>Все позиции</Typography.Title>
                    <Flex gap={8}>
                        <Button shape='square' icon={<ReloadOutlined />} onClick={refetch}/>
                        <Button 
                            type='primary' 
                            shape='square' 
                            icon={<PlusCircleOutlined />}
                            onClick={showModal}
                        >Добавить</Button>
                    </Flex>
                </Flex>
                <Table<Product>
                    rowSelection={{ type: 'checkbox' }}
                    columns={columns}
                    pagination={false}
                    dataSource={(isLoading || isFetching) ? [] : items} 
                    className='products-page__table'
                    loading={isLoading || isFetching}
                    rowKey='id'
                    onChange={handleTableChange}
                />
                {total > 0 && (
                    <Flex justify='space-between'>
                    <Typography.Paragraph type='secondary'>
                        Показано <Typography.Text>
                            {(page - 1) * PAGE_SIZE + 1}-{(page * PAGE_SIZE) < total ? (page * PAGE_SIZE) : total} 
                        </Typography.Text> 
                        {' '}из <Typography.Text>{total}</Typography.Text>
                    </Typography.Paragraph>
                    <Pagination 
                        current={page} 
                        onChange={handlePageChange} 
                        total={total} 
                        pageSize={PAGE_SIZE}
                        showSizeChanger={false}
                    />
                </Flex>
                )}
            </Flex>
        </div>
    )
}

export default ProductsPage;