import {Card,Grid,Table,Button,Loading, useToasts,Image} from '@geist-ui/react';
import React,{ useEffect, useState } from 'react';
import { CartContext } from '../components/contextprovider';
import Deliverymethod from '../components/deliverymethod';
import Carttable from '../components/carttable';
import Checkout from '../components/checkout';
import { CSSTransition,SwitchTransition } from 'react-transition-group';
const Cart = () => {
    const [cart,setCart] = React.useContext(CartContext);
    const [data,setData] = useState(undefined);
    const [paid,setPay] = useState(false);
    const [delivery,setDelivery] = useState({stage: false,takeaway: false});
    return (
        <SwitchTransition>
        <CSSTransition
          key={[delivery.stage,paid]}
          addEndListener={(node, done) => node.addEventListener("transitionend", done, false)}
          classNames='fade'>
        <Grid.Container className="cartcard" alignItems="center" justify="center">
            <Grid xs={24} sm={18} md={12}>
            <Card style={{position: 'relative'}} type="violet" shadow>
            {!paid ? <Carttable paid={setPay}/>
                : 
                !delivery.stage ? <Deliverymethod paid={setPay} setDelivery={setDelivery}/>
                :
                <Checkout paid={setPay} setDelivery={setDelivery}/>
                }
            </Card>
            </Grid>
        </Grid.Container>
        </CSSTransition>
   </SwitchTransition>
    )
}
export default Cart;