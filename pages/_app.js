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
      adminlevel: 0,
      user: {
        name: null,
        address: null,
        phone: null,
        adminlevel: 0
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

  useEffect( async() => { // auto login and checks user changes
    const saveduser = JSON.parse(localStorage.getItem('user'));
    if (saveduser.adminlevel !== undefined && saveduser.adminlevel > 0 || user.adminlevel > 1){
      const result = await isLogged();
      if (result.data.status.code === 200){
        if (!_.isEqual(user,{...user,...result.data.data}))
          setUser({...user,...result.data.data});
      }
      else{
        if (!_.isEqual(user,{...user,adminlevel: 0}))
          setUser({...user,adminlevel: 0})
      }
    }
  }, [[],user]);

  useEffect( () => {
    if (Router.pathname.includes('/admin/') && user.adminlevel !== null){
      if ( user.adminlevel < 1 ){
        setToast({type: "warning",text: "This path isnt allowed"});
        Router.replace('/');
      }
    }
  },[[],path]);


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