import '../styles/globals.scss'
import { GeistProvider, CssBaseline, Grid, Text, Card } from '@geist-ui/react'
import {FaPizzaSlice} from 'react-icons/fa';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import {UserContext,CartContext,} from '../components/contextprovider';
import React, {useEffect,useState} from 'react';
import Router from 'next/router';
const Loadingscreen = () => {
  return (
        <Card className="centerdiv" style={{textAlign: "center",fontSize: "2em"}} width={'50%'} shadow>
          <FaPizzaSlice className="pizza-spinner"/>
          <br/>
          <Text b>Loading</Text>
        </Card>
  )
}

function MyApp({ Component, pageProps }) {
  const [load, setLoad] = useState(false);
  Router.events.on('routeChangeStart', () => setLoad(true));
  Router.events.on('routeChangeComplete', () =>  setLoad(false));
  Router.events.on('routeChangeError', () => setLoad(false));
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
    oldcart: [],
    cart: []
  })
  return(
    <CartContext.Provider value={[cart,setCart]}>
    <GeistProvider theme={myTheme}>
      <CssBaseline />
      <Navbar/>
      <main id="page-wrap">
        {load ? <Loadingscreen/>:
        <Component {...pageProps} />
        }
      </main>
      {/* <Footer/> */}
    </GeistProvider>
    </CartContext.Provider>
  )
}

export default MyApp
