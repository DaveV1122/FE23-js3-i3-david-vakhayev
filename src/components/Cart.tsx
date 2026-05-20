import type { CartItem as CartItemType } from '../types/CartItem'
import CartItem from './CartItem'

interface CartProps {
  items: CartItemType[]
  onRemove: (productId: number) => void
}

function Cart({ items, onRemove }: CartProps) {
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  )

  return (
    <aside className="cart" aria-labelledby="cart-heading">
      <div className="section-heading">
        <h2 id="cart-heading">Shopping Cart</h2>
        <span>{items.length} rows</span>
      </div>

      {items.length > 0 ? (
        <>
          <ul className="cart-list">
            {items.map((item) => (
              <CartItem key={item.product.id} item={item} onRemove={onRemove} />
            ))}
          </ul>
          <div className="cart-total">
            <span>Total</span>
            <strong>${totalPrice.toFixed(2)}</strong>
          </div>
        </>
      ) : (
        <p className="empty-state">Your cart is empty.</p>
      )}
    </aside>
  )
}

export default Cart
