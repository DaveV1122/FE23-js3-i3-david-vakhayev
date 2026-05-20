interface HeaderProps {
  cartItemCount: number
}

function Header({ cartItemCount }: HeaderProps) {
  return (
    <header className="site-header">
      <div>
        <p className="eyebrow">Webshop</p>
        <h1>Modern Home Goods</h1>
      </div>
      <div className="cart-summary" aria-label={`${cartItemCount} items in cart`}>
        <span>{cartItemCount}</span>
        <small>in cart</small>
      </div>
    </header>
  )
}

export default Header
