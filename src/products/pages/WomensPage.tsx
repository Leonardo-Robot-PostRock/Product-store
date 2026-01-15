import { ProductList, useProducts } from ".."

export const WomensPage = () => {

  const { isLoading, products } = useProducts({
    filterKey: "women's clothing"
  })

  return (
    <div className="flex-col">
      <h1 className="text-2xl font-bold">Productos para mujeres</h1>

      {isLoading && <span>Cargando productos...</span>}


      <ProductList products={products ?? []} />

    </div>
  )
}