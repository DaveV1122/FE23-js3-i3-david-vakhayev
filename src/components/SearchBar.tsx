import type { Product } from '../types/Product'

interface SearchBarProps {
  searchTerm: string
  suggestions: Product[]
  onSearchChange: (value: string) => void
  onSuggestionSelect: (productName: string) => void
}

function SearchBar({
  searchTerm,
  suggestions,
  onSearchChange,
  onSuggestionSelect,
}: SearchBarProps) {
  return (
    <div className="search-bar">
      <label htmlFor="product-search">Search products</label>
      <input
        id="product-search"
        type="search"
        value={searchTerm}
        placeholder="Search by name or description"
        onChange={(event) => onSearchChange(event.target.value)}
      />
      {suggestions.length > 0 && (
        <ul className="suggestions" aria-label="Search suggestions">
          {suggestions.map((product) => (
            <li key={product.id}>
              <button
                type="button"
                aria-label={`Search for ${product.name}`}
                onClick={() => onSuggestionSelect(product.name)}
              >
                <span>{product.name}</span>
                <small>{product.popularity} popularity</small>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchBar
