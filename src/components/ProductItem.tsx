import type { Product } from '../types/Product'
import RatingStars from './RatingStars'

interface ProductItemProps {
  product: Product
  onAddToCart: (product: Product) => void
  onRateProduct: (productId: number, rating: number) => void
  onShowDetails: (product: Product) => void
}

function ProductItem({
  product,
  onAddToCart,
  onRateProduct,
  onShowDetails,
}: ProductItemProps) {
  return (
    <article className="product-card">
      <img src={product.image} alt={product.name} className="product-card__image" />
      <div className="product-card__content">
        <div>
          <p className="product-number">{product.productNumber}</p>
          <h2>{product.name}</h2>
          <p className="product-card__description">{product.description}</p>
        </div>
        <RatingStars
          ratingAverage={product.ratingAverage}
          ratingVotes={product.ratingVotes}
          onRate={(ratingValue) => onRateProduct(product.id, ratingValue)}
        />
        <div className="product-card__footer">
          <strong>${product.price.toFixed(2)}</strong>
          <div className="button-group">
            <button
              type="button"
              aria-label={`Show more information about ${product.name}`}
              onClick={() => onShowDetails(product)}
            >
              More Information
            </button>
            <button
              type="button"
              className="button-primary"
              aria-label={`Add ${product.name} to cart`}
              onClick={() => onAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default ProductItem
