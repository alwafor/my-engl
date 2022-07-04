import "../styles/global.css";
import type { AppProps } from "next/app";
import "@/assets/styles/styles.scss"

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}