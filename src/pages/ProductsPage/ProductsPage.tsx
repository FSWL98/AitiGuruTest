import { useEffect, useState, type FC } from 'react';
import {
    Button,
    Input,
    Flex, 
    Table, 
    Pagination, 
    Typography, 
    Card, 
    Image, 
    Space,
    type PaginationProps 
} from 'antd';
import { PlusOutlined, EllipsisOutlined, ReloadOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import './styles.css';

const PAGE_SIZE = 20;

interface Product {
    id: string | number;
    title: string;
    category: string;
    brand?: string;
    sku: string;
    rating: number;
    price: number;
    thumbnail: string;
}

const columns: TableProps<Product>['columns'] = [
    {
        title: 'Наименование',
        dataIndex: 'title',
        key: 'title',
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
                description={row.brand}
            />
        </Card>
        ),
    },
    {
        title: 'Вендор',
        dataIndex: 'brand',
        key: 'brand',
        render: (val) => <strong>{val ?? 'Не указан'}</strong>,
        align: 'center'
    },
    {
        title: 'Артикул',
        dataIndex: 'sku',
        key: 'sku',
        align: 'center'
    },
    {
        title: 'Оценка',
        dataIndex: 'rating',
        key: 'rating',
        render: (val) => <><Typography.Text type={val < 3 && 'danger'}>{val}</Typography.Text>/5</>,
        align: 'center'
    },
    {
        title: 'Цена, ₽',
        dataIndex: 'price',
        key: 'price',
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
          <Flex justify='space-between' align='center'>
            <Button type='primary' shape='round' icon={<PlusOutlined />} />
            <Button shape='circle' icon={<EllipsisOutlined />} />
          </Flex>
        ),
    },
]

const data: Product[] = [
    {
        "id": 1,
        "title": "Essence Mascara Lash Princess",
        "category": "beauty",
        "price": 9.99,
        "rating": 2.56,
        "brand": "Essence",
        "sku": "BEA-ESS-ESS-001",
        "thumbnail": "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp"
    },
    {
        "id": 2,
        "title": "Eyeshadow Palette with Mirror",
        "category": "beauty",
        "price": 19.99,
        "rating": 2.86,
        "brand": "Glamour Beauty",
        "sku": "BEA-GLA-EYE-002",
        "thumbnail": "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp"
    },
    {
        "id": 3,
        "title": "Powder Canister",
        "category": "beauty",
        "price": 14.99,
        "rating": 4.64,
        "brand": "Velvet Touch",
        "sku": "BEA-VEL-POW-003",
        "thumbnail": "https://cdn.dummyjson.com/product-images/beauty/powder-canister/thumbnail.webp"
    },
    {
        "id": 4,
        "title": "Red Lipstick",
        "category": "beauty",
        "price": 12.99,
        "rating": 4.36,
        "brand": "Chic Cosmetics",
        "sku": "BEA-CHI-LIP-004",
        "thumbnail": "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/thumbnail.webp"
    },
    {
        "id": 5,
        "title": "Red Nail Polish",
        "category": "beauty",
        "price": 8.99,
        "rating": 4.32,
        "brand": "Nail Couture",
        "sku": "BEA-NAI-NAI-005",
        "thumbnail": "https://cdn.dummyjson.com/product-images/beauty/red-nail-polish/thumbnail.webp"
    },
    {
        "id": 6,
        "title": "Calvin Klein CK One",
        "category": "fragrances",
        "price": 49.99,
        "rating": 4.37,
        "brand": "Calvin Klein",
        "sku": "FRA-CAL-CAL-006",
        "thumbnail": "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/thumbnail.webp"
    },
    {
        "id": 7,
        "title": "Chanel Coco Noir Eau De",
        "category": "fragrances",
        "price": 129.99,
        "rating": 4.26,
        "brand": "Chanel",
        "sku": "FRA-CHA-CHA-007",
        "thumbnail": "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/thumbnail.webp"
    },
    {
        "id": 8,
        "title": "Dior J'adore",
        "category": "fragrances",
        "price": 89.99,
        "rating": 3.8,
        "brand": "Dior",
        "sku": "FRA-DIO-DIO-008",
        "thumbnail": "https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/thumbnail.webp"
    },
    {
        "id": 9,
        "title": "Dolce Shine Eau de",
        "category": "fragrances",
        "price": 69.99,
        "rating": 3.96,
        "brand": "Dolce & Gabbana",
        "sku": "FRA-DOL-DOL-009",
        "thumbnail": "https://cdn.dummyjson.com/product-images/fragrances/dolce-shine-eau-de/thumbnail.webp"
    },
    {
        "id": 10,
        "title": "Gucci Bloom Eau de",
        "category": "fragrances",
        "price": 79.99,
        "rating": 2.74,
        "brand": "Gucci",
        "sku": "FRA-GUC-GUC-010",
        "thumbnail": "https://cdn.dummyjson.com/product-images/fragrances/gucci-bloom-eau-de/thumbnail.webp"
    },
    {
        "id": 11,
        "title": "Annibale Colombo Bed",
        "category": "furniture",
        "price": 1899.99,
        "rating": 4.77,
        "brand": "Annibale Colombo",
        "sku": "FUR-ANN-ANN-011",
        "thumbnail": "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/thumbnail.webp"
    },
    {
        "id": 12,
        "title": "Annibale Colombo Sofa",
        "category": "furniture",
        "price": 2499.99,
        "rating": 3.92,
        "brand": "Annibale Colombo",
        "sku": "FUR-ANN-ANN-012",
        "thumbnail": "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/thumbnail.webp"
    },
    {
        "id": 13,
        "title": "Bedside Table African Cherry",
        "category": "furniture",
        "price": 299.99,
        "rating": 2.87,
        "brand": "Furniture Co.",
        "sku": "FUR-FUR-BED-013",
        "thumbnail": "https://cdn.dummyjson.com/product-images/furniture/bedside-table-african-cherry/thumbnail.webp"
    },
    {
        "id": 14,
        "title": "Knoll Saarinen Executive Conference Chair",
        "category": "furniture",
        "price": 499.99,
        "rating": 4.88,
        "brand": "Knoll",
        "sku": "FUR-KNO-KNO-014",
        "thumbnail": "https://cdn.dummyjson.com/product-images/furniture/knoll-saarinen-executive-conference-chair/thumbnail.webp"
    },
    {
        "id": 15,
        "title": "Wooden Bathroom Sink With Mirror",
        "category": "furniture",
        "price": 799.99,
        "rating": 3.59,
        "brand": "Bath Trends",
        "sku": "FUR-BAT-WOO-015",
        "thumbnail": "https://cdn.dummyjson.com/product-images/furniture/wooden-bathroom-sink-with-mirror/thumbnail.webp"
    },
    {
        "id": 16,
        "title": "Apple",
        "category": "groceries",
        "price": 1.99,
        "rating": 4.19,
        "sku": "GRO-BRD-APP-016",
        "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/apple/thumbnail.webp"
    },
    {
        "id": 17,
        "title": "Beef Steak",
        "category": "groceries",
        "price": 12.99,
        "rating": 4.47,
        "sku": "GRO-BRD-BEE-017",
        "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/beef-steak/thumbnail.webp"
    },
    {
        "id": 18,
        "title": "Cat Food",
        "category": "groceries",
        "price": 8.99,
        "rating": 3.13,
        "sku": "GRO-BRD-FOO-018",
        "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/cat-food/thumbnail.webp"
    },
    {
        "id": 19,
        "title": "Chicken Meat",
        "category": "groceries",
        "price": 9.99,
        "rating": 3.19,
        "sku": "GRO-BRD-CHI-019",
        "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/chicken-meat/thumbnail.webp"
    },
    {
        "id": 20,
        "title": "Cooking Oil",
        "category": "groceries",
        "price": 4.99,
        "rating": 4.8,
        "sku": "GRO-BRD-COO-020",
        "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/cooking-oil/thumbnail.webp"
    },
    {
        "id": 21,
        "title": "Cucumber",
        "category": "groceries",
        "price": 1.49,
        "rating": 4.07,
        "sku": "GRO-BRD-CUC-021",
        "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/cucumber/thumbnail.webp"
    },
    {
        "id": 22,
        "title": "Dog Food",
        "category": "groceries",
        "price": 10.99,
        "rating": 4.55,
        "sku": "GRO-BRD-FOO-022",
        "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/dog-food/thumbnail.webp"
    },
    {
        "id": 23,
        "title": "Eggs",
        "category": "groceries",
        "price": 2.99,
        "rating": 2.53,
        "sku": "GRO-BRD-EGG-023",
        "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/eggs/thumbnail.webp"
    },
    {
        "id": 24,
        "title": "Fish Steak",
        "category": "groceries",
        "price": 14.99,
        "rating": 3.78,
        "sku": "GRO-BRD-FIS-024",
        "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/fish-steak/thumbnail.webp"
    },
    {
        "id": 25,
        "title": "Green Bell Pepper",
        "category": "groceries",
        "price": 1.29,
        "rating": 3.25,
        "sku": "GRO-BRD-GRE-025",
        "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/green-bell-pepper/thumbnail.webp"
    },
    {
        "id": 26,
        "title": "Green Chili Pepper",
        "category": "groceries",
        "price": 0.99,
        "rating": 3.66,
        "sku": "GRO-BRD-GRE-026",
        "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/green-chili-pepper/thumbnail.webp"
    },
    {
        "id": 27,
        "title": "Honey Jar",
        "category": "groceries",
        "price": 6.99,
        "rating": 3.97,
        "sku": "GRO-BRD-HON-027",
        "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/honey-jar/thumbnail.webp"
    },
    {
        "id": 28,
        "title": "Ice Cream",
        "category": "groceries",
        "price": 5.49,
        "rating": 3.39,
        "sku": "GRO-BRD-CRE-028",
        "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/ice-cream/thumbnail.webp"
    },
    {
        "id": 29,
        "title": "Juice",
        "category": "groceries",
        "price": 3.99,
        "rating": 3.94,
        "sku": "GRO-BRD-JUI-029",
        "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/juice/thumbnail.webp"
    },
    {
        "id": 30,
        "title": "Kiwi",
        "category": "groceries",
        "price": 2.49,
        "rating": 4.93,
        "sku": "GRO-BRD-KIW-030",
        "thumbnail": "https://cdn.dummyjson.com/product-images/groceries/kiwi/thumbnail.webp"
    }
]

const rowSelection: TableProps<Product>['rowSelection'] = {
    onChange: (selectedRowKeys, selectedRows: Product[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record: Product, selected: boolean) => {
        console.log(record, selected);
    }
  };

const ProductsPage: FC = () => {
    const [page, setPage] = useState<number>(1);
    const [total, setTotal] = useState<number>(30);
    const [items, setItems] = useState<Product[]>(data.slice(0, 20));

    const handlePageChange: PaginationProps['onChange'] = (newPage) => {
        setPage(newPage);

      };

    useEffect(() => {
        setItems(data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE))
    }, [page])

    return (
        <div className='products-page'>
            <Flex justify='space-between' align='center' className='products-page__container'>
                <Typography.Title level={1} style={{ minWidth: '25%', margin: '0' }}>Товары</Typography.Title>
                <Input 
                    placeholder='Найти' 
                    prefix={<SearchOutlined />} 
                    variant='filled'
                    size='large'
                />
                <div style={{ minWidth: '25%' }} />
            </Flex>
            <Space orientation='vertical' className='products-page__container' size={32}>
                <Flex justify='space-between' align='flex-start'>
                    <Typography.Title level={3}>Все позиции</Typography.Title>
                    <Flex gap={8}>
                        <Button shape='square' icon={<ReloadOutlined />} />
                        <Button type='primary' shape='square' icon={<PlusCircleOutlined />}>Добавить</Button>
                    </Flex>
                </Flex>
                <Table<Product>
                    rowSelection={{ type: 'checkbox', ...rowSelection }}
                    columns={columns}
                    pagination={false}
                    dataSource={items}
                    className='products-page__table'
                />
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
                    />
                </Flex>
            </Space>
        </div>
    )
}

export default ProductsPage;