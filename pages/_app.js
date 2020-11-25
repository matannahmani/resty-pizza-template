import '../styles/globals.scss'
import { GeistProvider, CssBaseline } from '@geist-ui/react'
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import {UserContext,CartContext,} from '../components/contextprovider';
import React, {useEffect,useState} from 'react';
function MyApp({ Component, pageProps }) {
  const myTheme = {
    "palette": {
      "foreground": "#011627",
      "warning": "#efbe1e",
      "warningLight": "#efbe1e"
    }
  }
  const [user, setUser] = useState(
    {
    user: {
      logged: false
    }
  });
  const [cart, setCart] = useState({
    oldcart: {pizza: [],burger: []},
    cart: {pizza: [],burger: []}
  })
  return(
    <CartContext.Provider value={[cart,setCart]}>
      
    <GeistProvider theme={myTheme}>
      <CssBaseline />
      <Navbar/>
      <main id="page-wrap">
        <Component {...pageProps} />
      </main>
      {/* <Footer/> */}
    </GeistProvider>
    </CartContext.Provider>
  )
}

export default MyApp
