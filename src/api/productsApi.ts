import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type ProductsResponse, type ProductsProps, type ProductCategory } from "../types/products";

const productsApi = createApi({
    reducerPath: 'products',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://dummyjson.com/'
    }),
    endpoints: (builder) => ({
        getProducts: builder.query<ProductsResponse, ProductsProps>({
            query: (props: ProductsProps) => {
                let paramsStr = `?skip=${props.skip ?? 0}&limit=${props.limit ?? 20}`;

                if (props.search) {
                    paramsStr += `&q=${props.search}`;
                }

                if (props.sort) {
                    paramsStr += `&sortBy=${props.sort.sortBy}&order=${props.sort.order}`;
                }

                paramsStr += '&select=title,price,rating,thumbnail,brand,category,sku,id'

                return `products/search${paramsStr}`;
            },
        }),
        getProductCategories: builder.query<ProductCategory[], void>({
            query: () => 'products/categories'
        })
    })
})

export default productsApi;

export const { useGetProductsQuery, useGetProductCategoriesQuery } = productsApi;