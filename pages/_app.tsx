import '../styles/global.css'
import type { AppProps } from 'next/app'
import Layout from '../component/layout'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return <Layout>
    <Component {...pageProps} />
  </Layout>
}
