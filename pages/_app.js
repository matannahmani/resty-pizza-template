import '../styles/globals.scss'
import { GeistProvider, CssBaseline } from '@geist-ui/react'
import Navbar from '../components/navbar';
import Footer from '../components/footer';
function MyApp({ Component, pageProps }) {
  const myTheme = {
    "palette": {
      "foreground": "#011627",
      "warning": "#efbe1e",
      "warningLight": "#efbe1e"
    }
  }
  return(
    <GeistProvider theme={myTheme}>
      <CssBaseline />
      <Navbar/>
      <main id="page-wrap">
        <Component {...pageProps} />
      </main>
      <Footer/>
    </GeistProvider>
  )
}

export default MyApp
