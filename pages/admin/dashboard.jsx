import {Grid,Button,Text,useToasts} from '@geist-ui/react';
import Link from 'next/link';
import React,{useEffect,useState} from 'react';
import { ShopContext } from '../../components/contextprovider';
import { useRouter } from 'next/router'

const Dashboard = () => {
    const [shop,setShop] = React.useContext(ShopContext);
    const router = useRouter();
    const [,setToasts] = useToasts();
    useEffect(() => {
        // here will fetch information from server
    }, [])
    const shopHandler = () =>{
        setToasts({type: 'success',text: `Shop is now ${(!shop.open) ? 'open' : 'closed'}`})
        setShop({...shop,open: !shop.open})
    }
    const deliveryHandler = () =>{
        // post server get response handle
        setToasts({type: 'success',text: `Delivery is now ${(!shop.delivery) ? 'open' : 'closed'}`})
        setShop({...shop,delivery: !shop.delivery})
    }
    return (
        <Grid.Container  alignItems="center" gap={4} direction="column">
            <Grid>
            <Text style={{color:"#FAFAFA"}} h1>Control Panel</Text>
            </Grid>
            <Grid>
                <Link href="orders">
                <Button shadow><Text b>Orders</Text></Button>
                </Link>
            </Grid>
            <Grid>
                <Link href="products">
                <Button shadow><Text b>Product List</Text></Button>
                </Link>
            </Grid>
            <Grid>
                <Link href="coupon">
                <Button shadow><Text b>Coupon List</Text></Button>
                </Link>
            </Grid>
            <Grid>
                <Button shadow onClick={deliveryHandler}><Text b>{(shop.delivery) ? 'Close Delivery' : 'Open Delivery' }</Text></Button>
            </Grid>
            <Grid>
                <Button shadow onClick={shopHandler}><Text b>{(shop.open) ? 'Close Shop' : 'Open Shop' }</Text></Button>
            </Grid>
            <Grid>
                <Button shadow onClick={() => router.push('/')}><Text b>Shop</Text></Button>
            </Grid>
        </Grid.Container>
    )
}
export default Dashboard;