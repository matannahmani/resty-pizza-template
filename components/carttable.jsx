
import {Grid,Table,Button,Loading, useToasts, Spacer, Modal} from '@geist-ui/react';
import React,{ useEffect, useState } from 'react';
import { CartContext } from '../components/contextprovider';
import {MdPayment} from 'react-icons/md';
import {RiCoupon2Fill} from 'react-icons/ri'
import TextField from '@material-ui/core/TextField';

const Carttable = (props) => {
    const [loading,setLoading] = useState(false);
    const [cart,setCart] = React.useContext(CartContext);
    const [data,setData] = useState(undefined);
    const [, setToast] = useToasts();
    const [state, setState] = useState(false);
    const coupon = React.createRef();
    const handler = () => setState(true);
    const [discount,setDiscount] = useState(1);
    const couponsarray = [{code: '10OFF',discount: 0.9},{code: '20OFF',discount: 0.80}];

    const closeHandler = (event) => {
      setState(false);
      setLoading(false);
    }

    const couponHandler = () => {
        setLoading(true)
        const code = coupon.current.value;
        setTimeout( () => {
            setLoading(false);
            if( couponsarray.some (e => e.code === code)){
                const endresult = couponsarray.find(e => e.code === code);
                setToast({text: `${(100 - endresult.discount * 100).toFixed(0)}% off applied`,type: "success"})
                setDiscount(endresult.discount);
                setState(false);
            }else{
                setToast({text: `Invaild Coupon`,type: "warning"})
            }
        }, 500);
    }
    const ordertotal = (discounton) =>{
        let count = 0;
        cart.cart.forEach((e) => {
            count += e.amount * e.price;
        })
        return discounton ? (count * discount).toFixed(2) : count.toFixed(2)
    }
    const operation = (actions, rowData) => {
        return (
            <>
                <Button type="success-light" style={{margin: '0px 4px'}} auto size="mini" onClick={() => {
                    const updatecart = [...cart.cart];
                    const rowindex = updatecart.findIndex(x => x.id === rowData.rowValue.id && x.size === rowData.rowValue.size);
                    updatecart[rowindex].amount += 1;
                    setCart({...cart,cart: updatecart})
                    setToast({text: `One ${rowData.rowValue.product} was added`,type: "success"})
                }}>+</Button>
                <Button type="error" auto size="mini" onClick={() => {
                    const updatecart = [...cart.cart]
                    const rowindex = updatecart.findIndex(x => x.id === rowData.rowValue.id && x.size === rowData.rowValue.size);
                    if (rowData.rowValue.amount > 1){
                        updatecart[rowindex].amount -= 1;
                        setCart({...cart,cart: updatecart})
                    }
                    else{
                        updatecart.splice(rowindex, 1);
                        setCart({...cart,cart: updatecart})
                        actions.remove()
                    }
                    setToast({text: `One ${rowData.rowValue.product} was removed`,type: "warning"})                
                }}>-</Button>
            </>
        )
    }

    useEffect(() => {
        console.log(cart);
        const mydata = []
        if (cart.cart.length > 0)
            cart.cart.forEach((e) => {
                mydata.push({id: e.id, size: e.size,product: `${e.name} - ${e.size}`,amount: e.amount,price: e.price, operation});
            });
        else
            setData({product: `none`, amount: `none`, operation})
        setData(mydata);
    }, [cart])

    return (
        <>
        <div className="cart-total">
        <h3 style={{textAlign: "center",color: "#FAFAFA"}}>Order Total : {ordertotal(true)} $</h3>
    {discount !== 1 ?  <span>Original Price: {ordertotal(false)}$</span> : null}
        </div>
        <Table data={data} hover={false}>
        <Table.Column prop="product" label="product" />
        <Table.Column prop="amount" label="amount" />
        <Table.Column prop="price" label="price" />
        <Table.Column prop="operation" label="operation" />
        </Table>
        {cart.cart.length < 1 ? 
        <Grid>                    
            <Loading type={"secondary"} size={"large"} color={"white"}>Cart is Empty</Loading>
        </Grid>
        : 
        <>
        <Spacer/>
        <Grid.Container justify="flex-end" alignItems="center">
            <Grid justify="space-between">
                <Button onClick={handler} ghost auto size="medium" shadow icon={<RiCoupon2Fill/>}>Coupon</Button>
                <Spacer inline={true}/>
                <Button onClick={() => {setToast({text: 'SOON', type: "success"});props.paid(true);}} ghost auto size="medium" shadow icon={<MdPayment/>}>Check Out</Button>
            </Grid>
        </Grid.Container>
        </>
        }
        <Modal open={state} onClose={closeHandler}>
        <Modal.Title>Enter Your Coupon</Modal.Title>
        <Modal.Content style={{textAlign: "center"}}>
        <TextField inputRef={coupon} id="form-code" className="label-shrink black" label="Code" />
        </Modal.Content>
        <Modal.Action passive onClick={() => setState(false)}>Cancel</Modal.Action>
        <Modal.Action loading={loading} onClick={couponHandler}>Submit</Modal.Action>
      </Modal>
        </>
    )
}

export default Carttable;