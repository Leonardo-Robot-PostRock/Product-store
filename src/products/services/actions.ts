import { type Product } from "../interfaces/products";
import { productsApi } from "./api/productsApi";

interface GetProducOptions {
    filterKey?: string;
}

const sleep = async (seconds: number = 0) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, seconds * 1000)
    })
}

export const getProducts = async ({ filterKey }: GetProducOptions): Promise<Product[]> => {

    await sleep(2);

    const filterUrl = filterKey ? `?category=${filterKey}` : '';

    const { data } = await productsApi.get<Product[]>(`/products${filterUrl}`);

    return data;
}

export const getProductById = async (id: number): Promise<Product> => {


    const { data } = await productsApi.get<Product>(`/products/${id}`);

    return data;
}