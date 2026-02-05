import styles from '@/styles/components/YearFilter.module.css'

interface YearFilterProps {
  selectedYear: string
  onChange: (year: string) => void
}

// Generate year options from current year down to 1980
function getYearOptions(): number[] {
  const currentYear = new Date().getFullYear() + 1
  const years: number[] = []
  for (let y = currentYear; y >= 1980; y--) {
    years.push(y)
  }
  return years
}

export default function YearFilter({
  selectedYear,
  onChange,
}: YearFilterProps) {
  const years = getYearOptions()

  return (
    <div className={styles.filterContainer}>
      <label htmlFor="year-filter" className={styles.label}>
        Year
      </label>
      <select
        id="year-filter"
        className={styles.select}
        value={selectedYear}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">All Years</option>
        {years.map((year) => (
          <option key={year} value={String(year)}>
            {year}
          </option>
        ))}
      </select>
    </div>
  )
}
