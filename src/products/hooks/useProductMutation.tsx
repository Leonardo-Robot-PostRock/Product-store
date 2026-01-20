import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Product, productActions } from "..";


export const useProductMutation = () => {

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: productActions.createProduct,
        onMutate: (product) => {
            console.log('Mutando - Optimistic Update');

            const optimisticProduct = { id: Math.random(), ...product };

            queryClient.setQueryData<Product[]>(
                ['products', { filterKey: product.category }], (old) => (old ? [...old, optimisticProduct] : [optimisticProduct])
            )

            return { optimisticProduct };

        },

        onSuccess: (product, _variables, context) => {
            // queryClient.invalidateQueries({ queryKey: ['products', { 'filterKey': product.category }] });

            // console.log({ product, variables, context });

            queryClient.removeQueries({ queryKey: ["product", context?.optimisticProduct.id] });

            queryClient.setQueryData<Product[]>(
                ['products', { filterKey: product.category }], (old) => {
                    if (!old) return [product];

                    return old.map(cacheProduct => {
                        return cacheProduct.id === context?.optimisticProduct.id ? product : cacheProduct;
                    })
                }
            )
        },

        onError: (error, variables, context) => {
            console.log({ error, variables, context });

            queryClient.removeQueries({ queryKey: ["product", context?.optimisticProduct.id] });

            queryClient.setQueryData<Product[]>(
                ['products', { filterKey: variables.category }], (old) => {
                    if (!old) return [];

                    return old.filter(cacheProduct => {
                        return cacheProduct.id !== context?.optimisticProduct.id;
                    })
                }
            )
        },

        onSettled: () => {
            console.log('Mutación finalizada');
        }
    })

    return mutation

}