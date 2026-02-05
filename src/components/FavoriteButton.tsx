import { useFavoritesContext } from '@/contexts/favorites'
import styles from '@/styles/components/FavoriteButton.module.css'

interface FavoriteButtonProps {
  makeId: number
  makeName: string
}

export default function FavoriteButton({
  makeId,
  makeName,
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavoritesContext()
  const favorited = isFavorite(makeId)

  return (
    <button
      className={`${styles.button} ${favorited ? styles.active : ''}`}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleFavorite(makeId, makeName)
      }}
      title={favorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      {favorited ? '★' : '☆'}
    </button>
  )
}
