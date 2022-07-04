import "../styles/global.css";
import type { AppProps } from "next/app";
import "@/assets/styles/styles.scss"
import Navbar from '@/components/layout/Navbar'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Navbar/>
    <Component {...pageProps} />;
  </>
}