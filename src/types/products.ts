export type Product = {
    id: string | number;
    title: string;
    category: string;
    brand?: string;
    sku: string;
    rating: number;
    price: number;
    thumbnail: string;
}

export type ProductsResponse = {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

export type SortState = {
    sortBy: string;
    order: 'asc' | 'desc';
}

export type ProductsProps = {
    skip?: number;
    limit?: number;
    search?: string;
    sort?: SortState;
}

export type ProductCategory = {
    slug: string;
    name: string;
    url: string;
}