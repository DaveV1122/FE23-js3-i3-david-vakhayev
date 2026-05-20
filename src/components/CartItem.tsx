import type { CartItem as CartItemType } from '../types/CartItem'

interface CartItemProps {
  item: CartItemType
  onRemove: (productId: number) => void
}

function CartItem({ item, onRemove }: CartItemProps) {
  const subtotal = item.product.price * item.quantity

  return (
    <li className="cart-item">
      <img src={item.product.image} alt={item.product.name} />
      <div className="cart-item__details">
        <h3>{item.product.name}</h3>
        <p>
          {item.quantity} x ${item.product.price.toFixed(2)}
        </p>
        <strong>${subtotal.toFixed(2)}</strong>
      </div>
      <button
        type="button"
        aria-label={`Remove ${item.product.name} from cart`}
        onClick={() => onRemove(item.product.id)}
      >
        Remove
      </button>
    </li>
  )
}

export default CartItem
