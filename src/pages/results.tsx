import { useCallback, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { useSearchContext } from '@/contexts/search'
import SearchBar from '@/components/SearchBar'
import MakeGrid from '@/components/MakeGrid'
import styles from '@/styles/Results.module.css'

export default function ResultsPage() {
  const router = useRouter()
  const { filteredMakes, isLoading, searchMakes, allMakes } = useSearchContext()
  const initializedRef = useRef(false)

  // Sync search from URL query param on mount
  useEffect(() => {
    if (!router.isReady || initializedRef.current) return
    initializedRef.current = true

    const q = router.query.q
    if (typeof q === 'string' && q.trim()) {
      searchMakes(q.trim())
    }
  }, [router.isReady, router.query.q, searchMakes])

  const handleSearch = useCallback(
    (searchQuery: string) => {
      searchMakes(searchQuery)
      const params = new URLSearchParams()
      if (searchQuery.trim()) {
        params.set('q', searchQuery.trim())
      }
      router.replace(
        { pathname: '/results', search: params.toString() },
        undefined,
        { shallow: true }
      )
    },
    [searchMakes, router]
  )

  const initialQuery =
    typeof router.query.q === 'string' ? router.query.q : ''

  // Use all makes when no query provided, filtered when searching
  const displayMakes = initialQuery.trim() ? filteredMakes : allMakes

  return (
    <div className={styles.container}>
      <div className={styles.searchSection}>
        <h1 className={styles.title}>Browse Truck Makes</h1>
        <SearchBar onSearch={handleSearch} initialValue={initialQuery} />
      </div>

      <div className={styles.resultsHeader}>
        <span className={styles.resultCount}>
          {displayMakes.length} make{displayMakes.length !== 1 ? 's' : ''}
        </span>
        {/* FEATURE 1: Sort toggle should be added here */}
      </div>

      <MakeGrid makes={displayMakes} isLoading={isLoading} />
    </div>
  )
}
