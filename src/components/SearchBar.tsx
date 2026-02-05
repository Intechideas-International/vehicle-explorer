import { useEffect, useRef, useState } from 'react'
import styles from '@/styles/components/SearchBar.module.css'

interface SearchBarProps {
  onSearch: (query: string) => void
  initialValue?: string
  placeholder?: string
}

// Custom debounce hook — delays value updates
function useDebounce(value: string, delay: number): string {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

export default function SearchBar({
  onSearch,
  initialValue = '',
  placeholder = 'Search truck makes...',
}: SearchBarProps) {
  const [inputValue, setInputValue] = useState(initialValue)
  const debouncedValue = useDebounce(inputValue, 350)
  const isFirstRender = useRef(true)
  // Keep a stable reference to the latest callback to avoid
  // re-triggering the effect when the parent re-renders
  const onSearchRef = useRef(onSearch)
  onSearchRef.current = onSearch

  // Debounce ensures this only fires after user stops typing
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    onSearchRef.current(debouncedValue)
  }, [debouncedValue])

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        className={styles.searchInput}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
      />
      {inputValue && (
        <button
          className={styles.clearButton}
          onClick={() => setInputValue('')}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  )
}
