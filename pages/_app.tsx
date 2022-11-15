import '../styles/global.css'
import type { AppProps } from 'next/app'
import Header from '../component/header'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return <Header>
    <Component {...pageProps} />
  </Header>
}
