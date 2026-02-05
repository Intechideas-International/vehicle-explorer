import { useCallback } from 'react'
import { useRouter } from 'next/router'
import { useSearchContext } from '@/contexts/search'
import SearchBar from '@/components/SearchBar'
import MakeGrid from '@/components/MakeGrid'
import styles from '@/styles/Home.module.css'

const POPULAR_MAKE_IDS = [460, 448, 474, 482, 515, 467, 542, 476]

export default function HomePage() {
  const router = useRouter()
  const { allMakes, filteredMakes, isLoading, query, searchMakes } =
    useSearchContext()

  const handleSearch = useCallback(
    (searchQuery: string) => {
      searchMakes(searchQuery)
      if (searchQuery.trim()) {
        router.push(`/results?q=${encodeURIComponent(searchQuery.trim())}`, undefined, {
          shallow: true,
        })
      }
    },
    [searchMakes, router]
  )

  // Show popular makes when no search query is entered
  const popularMakes = allMakes.filter((m) =>
    POPULAR_MAKE_IDS.includes(m.MakeId)
  )

  const displayMakes = query.trim() ? filteredMakes : popularMakes

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1 className={styles.title}>Truck Make & Model Explorer</h1>
        <p className={styles.subtitle}>
          Discover truck manufacturers and explore their models
        </p>
        <SearchBar onSearch={handleSearch} />
      </section>

      <section className={styles.makesSection}>
        <h2 className={styles.sectionTitle}>
          {query.trim() ? 'Search Results' : 'Popular Makes'}
        </h2>
        <MakeGrid makes={displayMakes} isLoading={isLoading && !allMakes.length} />
      </section>
    </div>
  )
}
