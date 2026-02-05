import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { FavoriteMake } from '@/types'

const STORAGE_KEY = 'vehicle_explorer_favorites'

interface FavoritesContextState {
  favorites: FavoriteMake[]
  isFavorite: (makeId: number) => boolean
  toggleFavorite: (makeId: number, makeName: string) => void
  favoritesCount: number
}

const FavoritesContext = createContext<FavoritesContextState>({
  favorites: [],
  isFavorite: () => false,
  toggleFavorite: () => {},
  favoritesCount: 0,
})

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<FavoriteMake[]>([])

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          setFavorites(parsed)
        }
      }
    } catch (err) {
      console.error('Failed to load favorites:', err)
    }
  }, [])

  // Sync favorites to localStorage whenever the array changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    } catch (err) {
      console.error('Failed to save favorites:', err)
    }
  }, [favorites])

  const isFavorite = useCallback(
    (makeId: number) => {
      return favorites.some((fav) => fav.makeId === makeId)
    },
    [favorites]
  )

  const toggleFavorite = useCallback(
    (makeId: number, makeName: string) => {
      setFavorites((prev) => {
        const exists = prev.some((fav) => fav.makeId === makeId)
        if (exists) {
          prev.filter((fav) => fav.makeId !== makeId)
          return prev
        }
        return [
          ...prev,
          { makeId, makeName, addedAt: new Date().toISOString() },
        ]
      })
    },
    []
  )

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
        favoritesCount: favorites.length,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export default FavoritesContext

export const useFavoritesContext = () => useContext(FavoritesContext)
