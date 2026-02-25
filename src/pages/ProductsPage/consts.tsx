import { Button, Card, Flex, Image, Typography, type TableProps } from 'antd';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { type Product } from '../../types/products';

export const PAGE_SIZE = 20;

export const columns: TableProps<Product>['columns'] = [
    {
        title: 'Наименование',
        dataIndex: 'title',
        key: 'title',
        sorter: true,
        sortDirections: ['ascend', 'descend'],
        render: (_, row) => (
            <Card className='item-title-card' size='small'>
            <Card.Meta
                avatar={
                    <Image 
                        src={row.thumbnail} 
                        alt={row.title} 
                        width={48} 
                        height={48}
                        className='item-title-card__image'
                        placeholder
                    />
                }
                title={row.title}
                description={row.category.replace('-', ' ')}
            />
        </Card>
        ),
    },
    {
        title: 'Вендор',
        dataIndex: 'brand',
        key: 'brand',
        sorter: true,
        sortDirections: ['ascend', 'descend'],
        render: (val) => <strong>{val ?? 'Не указан'}</strong>,
        align: 'center'
    },
    {
        title: 'Артикул',
        dataIndex: 'sku',
        key: 'sku',
        sorter: true,
        sortDirections: ['ascend', 'descend'],
        align: 'center'
    },
    {
        title: 'Оценка',
        dataIndex: 'rating',
        key: 'rating',
        sorter: true,
        sortDirections: ['ascend', 'descend'],
        render: (val) => <><Typography.Text type={val < 3 ? 'danger' : undefined}>{val}</Typography.Text>/5</>,
        align: 'center'
    },
    {
        title: 'Цена, ₽',
        dataIndex: 'price',
        key: 'price',
        sorter: true,
        sortDirections: ['ascend', 'descend'],
        align: 'center',
        render: (val) => {
            const formatter = new Intl.NumberFormat('ru-RU', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
                useGrouping: true
            });
            
            const formattedPrice = formatter.format(val);
            
            const parts = formattedPrice.split(',');

            return <div style={{ fontFamily: 'Roboto Mono' }}>
                <Typography.Text>{parts[0]}</Typography.Text>
                <Typography.Text type='secondary'>,{parts[1]}</Typography.Text>
            </div>
        }
    },
    {
        title: '',
        render: () => (
          <Flex justify='flex-start' align='center' gap={16}>
            <Button type='primary' shape='round' icon={<PlusOutlined />} />
            <Button shape='circle' icon={<EllipsisOutlined />} />
          </Flex>
        ),
    },
]