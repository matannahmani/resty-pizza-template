import '../styles/globals.scss'
import Head from 'next/head';
import { GeistProvider, CssBaseline, Text, Card } from '@geist-ui/react';
import {FaPizzaSlice} from 'react-icons/fa';
import Navbar from '../components/navbar';
import {UserContext,CartContext, ShopContext,} from '../components/contextprovider';
import React, {useEffect,useState, useRef} from 'react';
import Router from 'next/router';
import Close from '../components/close';
import Footer from '../components/footer';

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
  const [shop,setShop] = useState({open: true,delivery: true})
  const [path,sethPath] = useState('');
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
        name: null,
        address: null,
        phone: null,
      }
    });

  const [cart, setCart] = useState({
    oldcart: [],
    cart: []
  })

  useEffect(() => { // loads cart if saved at local storage
    sethPath(Router.pathname);// set path
    if (didMountRef.current === false){ // checks if first load
      const savedcart = localStorage.getItem('cart'); // loads cart
      if (savedcart !== null) // checks if not empty
        setCart(JSON.parse(savedcart)); // load cart if not empty
      didMountRef.current = true;
    }else
      localStorage.setItem('cart',JSON.stringify(cart)); // updates cart every time to local storage
  }, [[],cart])

  return(
    <>
    <Head>
        <title>Pizza Pepperoni</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <meta name='viewport' 
     content='width=device-width, initial-scale=1.0, maximum-scale=1.0, 
     user-scalable=0' ></meta>
    </Head>
    <ShopContext.Provider value={[shop,setShop]}>
    <CartContext.Provider value={[cart,setCart]}>
    <UserContext.Provider value={[user,setUser]}>
    <GeistProvider theme={myTheme}>
      <CssBaseline />
      <Navbar/>
      <main id="page-wrap">
        <div className="content-center">

        {shop.open || path.includes('admin') ? load ? <Loadingscreen/> : <Component {...pageProps} />
        :
        <Close/>
      }
      </div>
      </main>
      <Footer/>
    </GeistProvider>
    </UserContext.Provider>
    </CartContext.Provider>
    </ShopContext.Provider>
    </>
  )
}

export default MyApp
