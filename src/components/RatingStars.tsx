import { useState } from 'react'

interface RatingStarsProps {
  ratingAverage: number
  ratingVotes: number
  onRate: (ratingValue: number) => void
}

const starValues = [1, 2, 3, 4, 5]

function RatingStars({ ratingAverage, ratingVotes, onRate }: RatingStarsProps) {
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const visibleRating = selectedRating ?? Math.round(ratingAverage)

  const handleStarClick = (ratingValue: number) => {
    setSelectedRating(ratingValue)
    onRate(ratingValue)
  }

  return (
    <div className="rating" aria-label={`${ratingAverage.toFixed(1)} out of 5 stars`}>
      <div className="rating__stars">
        {starValues.map((starValue) => (
          <button
            key={starValue}
            type="button"
            className="rating__star-button"
            aria-label={`Rate ${starValue} out of 5`}
            aria-pressed={selectedRating === starValue}
            onClick={() => handleStarClick(starValue)}
          >
            {starValue <= visibleRating ? '★' : '☆'}
          </button>
        ))}
      </div>
      <span>
        {ratingAverage.toFixed(1)} ({ratingVotes} votes)
      </span>
    </div>
  )
}

export default RatingStars
