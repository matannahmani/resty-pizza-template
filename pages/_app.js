import '../styles/globals.scss'
import Head from 'next/head';
import { GeistProvider, CssBaseline, Text, Card, useToasts } from '@geist-ui/react';
import {FaPizzaSlice} from 'react-icons/fa';
import Navbar from '../components/navbar';
import {UserContext,CartContext, ShopContext} from '../components/contextprovider';
import React, {useEffect,useState, useRef} from 'react';
import Router from 'next/router';
import Close from '../components/close';
import Footer from '../components/footer';
import Pizzaspinner from '../components/pizzaspinner';
import {isLogged} from '../lib/userapicontroller';

var _ = require('lodash');

const Loadingscreen = () => {
  return (
    <Card className="centerdiv" style={{textAlign: "center",fontSize: "2em"}} width={'50%'} shadow>
      <Card.Body style={{overflow: 'hidden'}}>

          <FaPizzaSlice className="pizza-spinner"/>
          <br/>
          <Text b>Loading</Text>
      </Card.Body>
      </Card>
  )
}

function MyApp({ Component, pageProps }) {
  const didMountRef = useRef(false);
  const [load, setLoad] = useState(false);
  const [shop,setShop] = useState({open: true,delivery: true,loading: false})
  const [path,sethPath] = useState('');
  const [, setToast] = useToasts();
  Router.events.on('routeChangeStart', () => setLoad(true));
  Router.events.on('routeChangeComplete', () =>  {
    sethPath(Router.pathname);
    setLoad(false);
  });
  Router.events.on('routeChangeError', () => {
    setShop({...shop,loading: false});
    setLoad(false);
  });

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

  useEffect(() => {
    sethPath(Router.pathname);// set path
  },[]);

  useEffect(() => { // loads cart if saved at local storage
    if (didMountRef.current === false){ // checks if first load
      const savedcart = localStorage.getItem('cart'); // loads cart
      if (savedcart !== null) // checks if not empty
        setCart(JSON.parse(savedcart)); // load cart if not empty
      didMountRef.current = true;
    }else
      localStorage.setItem('cart',JSON.stringify(cart)); // updates cart every time to local storage
  }, [[],cart]);


  useEffect( async () => {
    setLoad(true);
    const result = await isLogged();
    if (result.data.status.code === 200){
      if (Router.pathname === '/admin' || Router.pathname === '/admin/' && result.data.adminlevel > 0){
        setToast({type: "success",text: "Logged in redirecting to dashboard"});
        Router.replace('admin/dashboard');        
      }
    }
    else if (Router.pathname.includes('/admin/')){
      setToast({type: "warning",text: "This path isnt allowed"});
      Router.replace('/');
  }
    setLoad(false);
  },[]);


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
      <div className={shop.loading ? 'showf spinner-div' : "spinner-div"}>
        {shop.loading ? <Pizzaspinner/> : null }
      </div>
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