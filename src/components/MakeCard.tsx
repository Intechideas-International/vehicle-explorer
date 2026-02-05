import Link from 'next/link'
import { TruckMake } from '@/types'
import FavoriteButton from './FavoriteButton'
import styles from '@/styles/components/MakeCard.module.css'

interface MakeCardProps {
  make: TruckMake
}

export default function MakeCard({ make }: MakeCardProps) {
  // Format the make name for display — title case
  const displayName =
    make.MakeName.charAt(0).toUpperCase() +
    make.MakeName.slice(1).toLowerCase()

  return (
    <div className={styles.card}>
      <Link
        href={`/make/${make.MakeId}?name=${encodeURIComponent(make.MakeName)}`}
        className={styles.cardLink}
      >
        <div className={styles.cardIcon}>🚛</div>
        <h3 className={styles.cardTitle}>{displayName}</h3>
      </Link>
      <div className={styles.cardActions}>
        <FavoriteButton makeId={make.MakeId} makeName={make.MakeName} />
      </div>
    </div>
  )
}
