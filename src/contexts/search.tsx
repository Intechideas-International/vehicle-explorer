import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { TruckMake } from '@/types'
import { getTruckMakes } from '@/services/api'

interface SearchContextState {
  allMakes: TruckMake[]
  filteredMakes: TruckMake[]
  isLoading: boolean
  query: string
  searchMakes: (query: string) => void
}

const SearchContext = createContext<SearchContextState>({
  allMakes: [],
  filteredMakes: [],
  isLoading: false,
  query: '',
  searchMakes: () => {},
})

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [allMakes, setAllMakes] = useState<TruckMake[]>([])
  const [filteredMakes, setFilteredMakes] = useState<TruckMake[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [query, setQuery] = useState('')
  const hasFetched = useRef(false)

  // Fetch all truck makes on first mount and cache them
  useEffect(() => {
    if (hasFetched.current) return
    hasFetched.current = true

    const loadMakes = async () => {
      setIsLoading(true)
      try {
        const makes = await getTruckMakes()
        setAllMakes(makes)
        setFilteredMakes(makes)
      } catch (err) {
        console.error('Failed to load truck makes:', err)
      } finally {
        setIsLoading(false)
      }
    }
    loadMakes()
  }, [])

  // Filter makes based on search query
  const searchMakes = useCallback(
    (searchQuery: string) => {
      setQuery(searchQuery)
      const trimmed = searchQuery.trim().toLowerCase()

      if (!trimmed) {
        setFilteredMakes(allMakes)
        return
      }

      const results = allMakes.filter((make) =>
        make.MakeName.toLowerCase().includes(trimmed)
      )
      setFilteredMakes(results)
    },
    [allMakes]
  )

  return (
    <SearchContext.Provider
      value={{
        allMakes,
        filteredMakes,
        isLoading,
        query,
        searchMakes,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export default SearchContext

export const useSearchContext = () => useContext(SearchContext)
