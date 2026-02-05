import Link from 'next/link'
import { useFavoritesContext } from '@/contexts/favorites'
import styles from '@/styles/components/Header.module.css'

export default function Header() {
  const { favoritesCount } = useFavoritesContext()

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link href="/" className={styles.logo}>
          🚛 Vehicle Explorer
        </Link>
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
          <Link href="/results" className={styles.navLink}>
            Browse
          </Link>
          <span className={styles.favorites}>
            ★ {favoritesCount}
          </span>
        </nav>
      </div>
    </header>
  )
}
