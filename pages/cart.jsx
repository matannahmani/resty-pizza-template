import {Card,Grid} from '@geist-ui/react';
import React,{ useEffect, useState } from 'react';
import { CartContext, ShopContext } from '../components/contextprovider';
import Deliverymethod from '../components/deliverymethod';
import Carttable from '../components/carttable';
import Checkout from '../components/checkout';
import { CSSTransition,SwitchTransition } from 'react-transition-group';
import {apicheckCart} from '../lib/orderapicontroller';
import {shopstatus} from '../lib/shopapicontroller';

const Cart = ({query}) => {
    const [cart,setCart] = React.useContext(CartContext);
    const [shop,setShop] = React.useContext(ShopContext);
    const [paid,setPay] = useState(false);
    const [delivery,setDelivery] = useState({stage: false,takeaway: false});
    const [discount,setDiscount] = useState({discount: 0,code: ''});
    const isArrayEqual = (x, y) => { // for cart checking => (local cart == server cart)
        return _(x).differenceWith(y, _.isEqual).isEmpty();
    };

    useEffect( () => { // check url params if user redirects to error from payment gateway
        if (query.takeaway !== undefined && query.takeaway === 'true' || query.takeaway === 'false'){
            setDelivery({...delivery,stage: true,takeaway: query.takeaway === 'true'})
            setPay(true);
        }
    },[])

    const checkshop = async () =>{ // for extreme case when someone in delivery and shop changed.
        const response = await shopstatus();
        if (!_.isEqual(response.data, _.omit(shop, 'loading')))
          setShop({...response.data});
        return response.data
    }

    useEffect(() => {
        checkshop();
    }, [paid,delivery.stage])

    useEffect( async () => { // to check if someone edited cart and confirm prices.
        if (cart.cart.length > 0){
            setShop({...shop,loading: true});
            let unseralized;
            const data = await apicheckCart(cart.cart.map(e => `${e.name}=>${e.choosensize}=>${e.amount}`));
            if (data.status === 200 && data.data.length > 0 ){
                unseralized = data.data.map(i => ({...i,key: `${i.id}${i.choosensize}`,amount: parseInt(i.amount)}) )
            }
            else{
                setCart({cart: [],oldcart: []})
                return setShop({...shop,loading: false});
            }
            if (unseralized !== undefined){
                if (!isArrayEqual(unseralized,cart.cart)){
                    setCart({cart: unseralized,oldcart: [shop.cart]});
                }
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
            <Card style={{position: 'relative',marginBottom: '16px'}} type="violet" shadow>
            <Card.Body style={{padding: '16pt 0pt'}}>
                {!paid ? <Carttable discount={discount} setDiscount={setDiscount} paid={setPay}/>
                    : 
                    !delivery.stage ? <Deliverymethod paid={setPay} setDelivery={setDelivery}/>
                    :
                    <Checkout discount={discount} paid={setPay} checkshop={checkshop} delivery={delivery.takeaway} setDelivery={setDelivery}/>
                }
            </Card.Body>
            </Card>
            </Grid>
        </Grid.Container>
        </CSSTransition>
   </SwitchTransition>
    )
}
Cart.getInitialProps = ({query}) => {
    return {query}
}
export default Cart;