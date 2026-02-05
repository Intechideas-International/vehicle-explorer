import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { VehicleModel } from '@/types'
import { getModelsForMake, getModelsForMakeYear } from '@/services/api'
import FavoriteButton from '@/components/FavoriteButton'
import ModelList from '@/components/ModelList'
import YearFilter from '@/components/YearFilter'
import styles from '@/styles/MakeDetail.module.css'

export default function MakeDetailPage() {
  const router = useRouter()
  const { makeId, name } = router.query

  const [models, setModels] = useState<VehicleModel[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Year state is synced from URL params in the effect below
  const [selectedYear, setSelectedYear] = useState<string>('')

  const makeName = typeof name === 'string' ? name : ''
  const makeIdNum = typeof makeId === 'string' ? parseInt(makeId, 10) : 0

  // Fetch models for a given make and year
  const fetchModels = async (make: string, year: string) => {
    if (!make) return

    setIsLoading(true)
    try {
      let results: VehicleModel[]
      if (year) {
        results = await getModelsForMakeYear(make, year)
      } else {
        results = await getModelsForMake(make)
      }
      setModels(results)
    } catch (err) {
      console.error('Failed to fetch models:', err)
      setModels([])
    } finally {
      setIsLoading(false)
    }
  }

  // Load data when router params become available.
  // Reads year from URL and syncs state, then fetches models.
  useEffect(() => {
    if (!router.isReady || !makeName) return

    // Sync year dropdown state from URL
    const yearParam = router.query.year
    if (typeof yearParam === 'string') {
      setSelectedYear(yearParam)
    }

    // Fetch models with current filter values
    fetchModels(makeName, selectedYear)
  }, [router.isReady, makeName])

  // When user changes the year dropdown, update URL and fetch
  const handleYearChange = (year: string) => {
    setSelectedYear(year)
    const query: Record<string, string> = { name: makeName }
    if (year) {
      query.year = year
    }
    router.push(
      { pathname: `/make/${makeId}`, query },
      undefined,
      { shallow: true }
    )

    // Fetch with the new year value
    fetchModels(makeName, year)
  }

  // Format make name for display
  const displayName = makeName
    ? makeName.charAt(0).toUpperCase() + makeName.slice(1).toLowerCase()
    : 'Unknown Make'

  return (
    <div className={styles.container}>
      <Link href="/results" className={styles.backLink}>
        ← Back to results
      </Link>

      <div className={styles.header}>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>{displayName}</h1>
          {makeIdNum > 0 && (
            <FavoriteButton makeId={makeIdNum} makeName={makeName} />
          )}
        </div>
        <p className={styles.subtitle}>
          Explore all models from {displayName}
        </p>
      </div>

      <div className={styles.filters}>
        <YearFilter
          selectedYear={selectedYear}
          onChange={handleYearChange}
        />
        {/* FEATURE 2: Vehicle type filter tabs should be added here */}
      </div>

      <ModelList
        models={models}
        isLoading={isLoading}
        makeName={displayName}
      />
    </div>
  )
}
