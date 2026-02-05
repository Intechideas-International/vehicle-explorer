import { VehicleModel } from '@/types'
import styles from '@/styles/components/ModelList.module.css'

interface ModelListProps {
  models: VehicleModel[]
  isLoading?: boolean
  makeName?: string
}

export default function ModelList({
  models,
  isLoading,
  makeName,
}: ModelListProps) {
  if (isLoading) {
    return (
      <div className={styles.loading}>
        <p>Loading models...</p>
      </div>
    )
  }

  if (models.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No models found{makeName ? ` for ${makeName}` : ''}.</p>
      </div>
    )
  }

  return (
    <div className={styles.listContainer}>
      <p className={styles.count}>
        {models.length} model{models.length !== 1 ? 's' : ''} found
      </p>
      <ul className={styles.list}>
        {models.map((model) => (
          <li key={model.Model_ID} className={styles.listItem}>
            <span className={styles.modelName}>{model.Model_Name}</span>
            {model.VehicleTypeName && (
              <span className={styles.vehicleType}>
                {model.VehicleTypeName}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
