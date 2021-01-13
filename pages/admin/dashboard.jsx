import {Grid,Button,Text,useToasts} from '@geist-ui/react';
import Link from 'next/link';
import React,{useEffect,useState} from 'react';
import { ShopContext } from '../../components/contextprovider';
import { useRouter } from 'next/router'
import { logout } from '../../lib/userapicontroller';

const Dashboard = () => {
    const [shop,setShop] = React.useContext(ShopContext);
    const router = useRouter();
    const [,setToasts] = useToasts();

    const shopHandler = () =>{
        setToasts({type: 'success',text: `החנות עכשיו ${(!shop.open) ? 'פתוחה' : 'סגורה'}`})
        setShop({...shop,open: !shop.open})
    }
    const deliveryHandler = () =>{
        // post server get response handle
        setToasts({type: 'success',text: `Delivery is now ${(!shop.delivery) ? 'פתוחה' : 'סגורה'}`})
        setShop({...shop,delivery: !shop.delivery})
    }
    return (
        <Grid.Container  alignItems="center" gap={4} direction="column">
            <Grid>
            <Text style={{color:"#FAFAFA"}} h1>פאנל ניהול</Text>
            </Grid>
            <Grid>
                <Link href="orders">
                <Button shadow><Text b>הזמנות</Text></Button>
                </Link>
            </Grid>
            <Grid>
                <Link href="products">
                <Button shadow><Text b>פאנל מוצרים</Text></Button>
                </Link>
            </Grid>
            <Grid>
                <Link href="coupon">
                <Button shadow><Text b>פאנל קופנים</Text></Button>
                </Link>
            </Grid>
            <Grid>
                <Button shadow onClick={deliveryHandler}><Text b>{(shop.delivery) ? 'סגור משלוחים' : 'פתח משלוחים' }</Text></Button>
            </Grid>
            <Grid>
                <Button shadow onClick={shopHandler}><Text b>{(shop.open) ? 'סגור חנות' : 'פתח חנות' }</Text></Button>
            </Grid>
            <Grid>
                <Button shadow onClick={() => router.push('/')}><Text b>חנות</Text></Button>
            </Grid>
            <Grid>
                <Button shadow type="error" onClick={() => {router.push('/');logout();}}><Text b>יציאה</Text></Button>
            </Grid>
        </Grid.Container>
    )
}
export default Dashboard;