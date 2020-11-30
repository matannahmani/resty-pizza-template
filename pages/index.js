import Head from 'next/head'
import {Grid,Image,Text,Card} from '@geist-ui/react'
import Productbox from '../components/productbox';
import { CartContext } from '../components/contextprovider';
export default function Home() {

  // let pizzalist = [];
  // for (let index = 0; index < 5;index++) {
  //   pizzalist.push(
  //   <Grid>
  //     <Product id={index}/>
  //   </Grid>)
  // }
  return (
    <>
    <Head>
        <title>Pizza Pepperoni</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <meta name='viewport' 
     content='width=device-width, initial-scale=1.0, maximum-scale=1.0, 
     user-scalable=0' ></meta>
    </Head>
    <Productbox/>
    </>
  )
}
