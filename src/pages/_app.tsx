import type { AppProps } from 'next/app'
import { SearchProvider } from '@/contexts/search'
import { FavoritesProvider } from '@/contexts/favorites'
import Layout from '@/components/Layout'
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SearchProvider>
      <FavoritesProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </FavoritesProvider>
    </SearchProvider>
  )
}
