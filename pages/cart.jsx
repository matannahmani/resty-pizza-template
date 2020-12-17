import {Card,Grid,Table,Button,Loading, useToasts,Image} from '@geist-ui/react';
import React,{ useEffect, useState } from 'react';
import { CartContext, ShopContext } from '../components/contextprovider';
import Deliverymethod from '../components/deliverymethod';
import Carttable from '../components/carttable';
import Checkout from '../components/checkout';
import { CSSTransition,SwitchTransition } from 'react-transition-group';
import {apicheckCart} from '../lib/orderapicontroller';

const Cart = () => {
    const [cart,setCart] = React.useContext(CartContext);
    const [shop,setShop] = React.useContext(ShopContext);
    const [paid,setPay] = useState(false);
    const [delivery,setDelivery] = useState({stage: false,takeaway: false});
    const [discount,setDiscount] = useState({discount: 0,code: ''});
    useEffect( async () => { // to check if someone edited cart and confirm prices.
        if (cart.cart.length > 0){
            setShop({...shop,loading: true});
            console.log(cart);
            let unseralized;
            const data = await apicheckCart(cart.cart.map(e => `${e.name}=>${e.choosensize}=>${e.amount}`));
            if (data.code === 200 && data.data !== null ){
                unseralized = data.data.map(i => ({...i,key: `${i.id}${i.choosensize}`,amount: parseInt(i.amount)}) )
            }
            if (unseralized !== undefined){
                console.log(unseralized);
                if (Object.entries(unseralized).sort().toString() !== Object.entries(cart.cart).sort().toString())
                    setCart({cart: unseralized,oldcart: {}});
            }
            setShop({...shop,loading: false});
        }
    }, [cart])
    return (
        <SwitchTransition>
        <CSSTransition
          key={[delivery.stage,paid]}
          addEndListener={(node, done) => node.addEventListener("transitionend", done, false)}
          classNames='fade'>
        <Grid.Container className="cartcard" alignItems="center" justify="center">
            <Grid xs={24} sm={18} md={12}>
            <Card style={{position: 'relative'}} type="violet" shadow>
            {!paid ? <Carttable discount={discount} setDiscount={setDiscount} paid={setPay}/>
                : 
                !delivery.stage ? <Deliverymethod paid={setPay} setDelivery={setDelivery}/>
                :
                <Checkout discount={discount} paid={setPay} delivery={delivery.takeaway} setDelivery={setDelivery}/>
                }
            </Card>
            </Grid>
        </Grid.Container>
        </CSSTransition>
   </SwitchTransition>
    )
}
export default Cart;