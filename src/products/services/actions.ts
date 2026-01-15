import { type Product } from "../interfaces/products";
import { productsApi } from "./api/productsApi";

interface GetProducOptions {
    filterKey?: string;
}

export const getProducts = async ({ filterKey }: GetProducOptions) => {

    const { data } = await productsApi.get<Product[]>(`/products`);

    return data;
}