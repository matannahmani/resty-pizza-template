import '../styles/globals.scss'
import { GeistProvider, CssBaseline, Text, Card } from '@geist-ui/react'
import {FaPizzaSlice} from 'react-icons/fa';
import Navbar from '../components/navbar';
import {UserContext,CartContext,} from '../components/contextprovider';
import React, {useEffect,useState, useRef} from 'react';
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
  const didMountRef = useRef(false);
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

  useEffect(() => { // loads cart if saved at local storage
    if (didMountRef.current === false){ // checks if first load
      const savedcart = localStorage.getItem('cart'); // loads cart
      if (savedcart !== null) // checks if not empty
        setCart(JSON.parse(savedcart)); // load cart if not empty
      didMountRef.current = true;
    }else
      localStorage.setItem('cart',JSON.stringify(cart)); // updates cart every time to local storage
  }, [[],cart])

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
