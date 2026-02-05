import { TruckMake } from '@/types'
import MakeCard from './MakeCard'
import styles from '@/styles/components/MakeGrid.module.css'

interface MakeGridProps {
  makes: TruckMake[]
  isLoading?: boolean
}

export default function MakeGrid({ makes, isLoading }: MakeGridProps) {
  if (isLoading) {
    return (
      <div className={styles.loading}>
        <p>Loading makes...</p>
      </div>
    )
  }

  if (makes.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No makes found. Try a different search.</p>
      </div>
    )
  }

  return (
    <div className={styles.grid}>
      {makes.map((make) => (
        <MakeCard key={make.MakeId} make={make} />
      ))}
    </div>
  )
}
