import '../styles/global.css'
import type {AppProps} from 'next/app'
import '@/assets/styles/styles.scss'
import Navbar from '@/components/layout/Navbar'
import {QueryClient, QueryClientProvider} from 'react-query'

const queryClient = new QueryClient()

export default function MyApp({Component, pageProps}: AppProps) {
  return <QueryClientProvider client={queryClient}>
    <div className={'container'}>
      <Navbar/>
      <Component {...pageProps} />
    </div>
  </QueryClientProvider>

}