import type { Product } from '../types/Product'
import ProductItem from './ProductItem'

interface ProductListProps {
  products: Product[]
  onAddToCart: (product: Product) => void
  onRateProduct: (productId: number, rating: number) => void
  onShowDetails: (product: Product) => void
}

function ProductList({
  products,
  onAddToCart,
  onRateProduct,
  onShowDetails,
}: ProductListProps) {
  return (
    <section className="product-list" aria-labelledby="products-heading">
      <div className="section-heading">
        <h2 id="products-heading">Search Results</h2>
        <span>{products.length} products</span>
      </div>

      {products.length > 0 ? (
        <div className="product-grid">
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onRateProduct={onRateProduct}
              onShowDetails={onShowDetails}
            />
          ))}
        </div>
      ) : (
        <p className="empty-state">No products match your search.</p>
      )}
    </section>
  )
}

export default ProductList
