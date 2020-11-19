import Head from 'next/head'
import {Grid,Image,Text,Card} from '@geist-ui/react'
import Product from '../components/product';
import {useState} from 'react';
export default function Home() {
  return (
    <>
    <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <Grid.Container direction="column" gap={4} alignItems="center" justify="center">
      <Grid>
      <Card className="headline" type={"dark"}>
        <Text className="head-text" h2 type={"warning"}>What would you like to order</Text>
      </Card>
      </Grid>
      </Grid.Container>
      <Grid.Container style={{padding: '40px'}} gap={2} alignItems="center" justify="space-evenly">
      <Grid>
        <Product/>
      </Grid>
      <Grid>
        <Product/>
      </Grid>
      <Grid>
        <Product/>
      </Grid>
      <Grid>
        <Product/>
      </Grid>
      <Grid>
        <Product/>
      </Grid>
      <Grid>
        <Product/>
      </Grid>
      <Grid>
        <Product/>
      </Grid>
      <Grid>
        <Product/>
      </Grid>
      </Grid.Container>
    </>
  )
}
