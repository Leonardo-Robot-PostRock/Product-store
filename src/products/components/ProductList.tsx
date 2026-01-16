import { Product, ProductCard } from ".."

interface Props {
  products: Product[];
}

export const ProductList = ({ products }: Props) => {
  return (
    <div className="mt-2 columns-1 sm:columns-2 md:columns-3 xl:columns-4 masonry">
      {products.map((product: Product) => (
        <div key={product.id} className="masonry-item">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  )
}