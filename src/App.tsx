import { useMemo, useState } from 'react'
import Cart from './components/Cart'
import Header from './components/Header'
import ProductList from './components/ProductList'
import ProductModal from './components/ProductModal'
import SearchBar from './components/SearchBar'
import productsData from './data/products.json'
import type { CartItem } from './types/CartItem'
import type { Product } from './types/Product'

function App() {
  const [products, setProducts] = useState<Product[]>(productsData as Product[])
  const [searchTerm, setSearchTerm] = useState('')
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    if (!normalizedSearch) {
      return [...products].sort((a, b) => b.popularity - a.popularity)
    }

    return products
      .filter((product) => {
        const searchableText = `${product.name} ${product.description}`.toLowerCase()
        return searchableText.includes(normalizedSearch)
      })
      .sort((a, b) => b.popularity - a.popularity)
  }, [products, searchTerm])

  const suggestions = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    if (normalizedSearch.length < 3) {
      return []
    }

    return products
      .filter((product) => {
        const searchableText = `${product.name} ${product.description}`.toLowerCase()
        return searchableText.includes(normalizedSearch)
      })
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 3)
  }, [products, searchTerm])

  const addToCart = (product: Product) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.product.id === product.id,
      )

      if (existingItem) {
        return currentItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }

      return [...currentItems, { product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: number) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.product.id !== productId),
    )
  }

  const handleRateProduct = (productId: number, ratingValue: number) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) => {
        if (product.id !== productId) {
          return product
        }

        const nextVotes = product.ratingVotes + 1
        const nextAverage =
          (product.ratingAverage * product.ratingVotes + ratingValue) / nextVotes

        return {
          ...product,
          ratingAverage: nextAverage,
          ratingVotes: nextVotes,
        }
      }),
    )

    setSelectedProduct((currentProduct) => {
      if (!currentProduct || currentProduct.id !== productId) {
        return currentProduct
      }

      const nextVotes = currentProduct.ratingVotes + 1
      const nextAverage =
        (currentProduct.ratingAverage * currentProduct.ratingVotes +
          ratingValue) /
        nextVotes

      return {
        ...currentProduct,
        ratingAverage: nextAverage,
        ratingVotes: nextVotes,
      }
    })
  }

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="app-shell">
      <Header cartItemCount={cartItemCount} />
      <SearchBar
        searchTerm={searchTerm}
        suggestions={suggestions}
        onSearchChange={setSearchTerm}
        onSuggestionSelect={setSearchTerm}
      />
      <main className="shop-layout">
        <ProductList
          products={filteredProducts}
          onAddToCart={addToCart}
          onRateProduct={handleRateProduct}
          onShowDetails={setSelectedProduct}
        />
        <Cart items={cartItems} onRemove={removeFromCart} />
      </main>
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
        onRateProduct={handleRateProduct}
      />
    </div>
  )
}

export default App
