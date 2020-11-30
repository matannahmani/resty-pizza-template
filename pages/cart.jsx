import {Card,Grid,Table,Button,Loading, useToasts,Image} from '@geist-ui/react';
import React,{ useEffect, useState } from 'react';
import { CartContext } from '../components/contextprovider';
import {MdPayment} from 'react-icons/md';
import Carttable from '../components/carttable';
import Checkout from '../components/checkout';
const Cart = () => {
    const [cart,setCart] = React.useContext(CartContext);
    const [data,setData] = useState(undefined);
    const [paid,setPay] = useState(false);

    return (
        <Grid.Container className="cartcard" alignItems="center" justify="center">
            <Grid xs={24} md={6}>
            <Card style={{position: 'relative'}} type="violet" shadow>

                {paid ? <Checkout paid={setPay}/> : <Carttable paid={setPay}/>}
            </Card>
            </Grid>
            
        </Grid.Container>
    )
}
export default Cart;