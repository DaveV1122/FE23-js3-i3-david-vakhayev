import { useEffect } from 'react'
import type { Product } from '../types/Product'
import RatingStars from './RatingStars'

interface ProductModalProps {
  product: Product | null
  onClose: () => void
  onAddToCart: (product: Product) => void
  onRateProduct: (productId: number, rating: number) => void
}

function ProductModal({
  product,
  onClose,
  onAddToCart,
  onRateProduct,
}: ProductModalProps) {
  useEffect(() => {
    if (!product) {
      return
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [onClose, product])

  if (!product) {
    return null
  }

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-heading"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="modal__close"
          aria-label="Close product information"
          onClick={onClose}
        >
          Close
        </button>
        <img src={product.image} alt={product.name} className="modal__image" />
        <div className="modal__content">
          <p className="product-number">{product.productNumber}</p>
          <h2 id="modal-heading">{product.name}</h2>
          <RatingStars
            ratingAverage={product.ratingAverage}
            ratingVotes={product.ratingVotes}
            onRate={(ratingValue) => onRateProduct(product.id, ratingValue)}
          />
          <p>{product.description}</p>
          <dl className="product-details">
            <div>
              <dt>Price</dt>
              <dd>${product.price.toFixed(2)}</dd>
            </div>
            <div>
              <dt>Popularity</dt>
              <dd>{product.popularity}/100</dd>
            </div>
          </dl>
          <button
            type="button"
            className="button-primary"
            aria-label={`Add ${product.name} to cart`}
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </section>
    </div>
  )
}

export default ProductModal
