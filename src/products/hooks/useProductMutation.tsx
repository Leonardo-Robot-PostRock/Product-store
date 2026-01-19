import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Product, productActions } from "..";


export const useProductMutation = () => {

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: productActions.createProduct,
        onSuccess: (product) => {
            // queryClient.invalidateQueries({ queryKey: ['products', { 'filterKey': product.category }] });

            queryClient.setQueryData<Product[]>(
                ['products', { filterKey: product.category }], (old) => (old ? [...old, product] : [product])
            )
        },
        onSettled: () => {
            console.log('Mutación finalizada');
        }
    })

    return mutation

}