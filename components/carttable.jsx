
import {Grid,Table,Button,Loading, useToasts, Spacer, Modal} from '@geist-ui/react';
import React,{ useEffect, useState } from 'react';
import { CartContext } from '../components/contextprovider';
import {MdPayment} from 'react-icons/md';
import {RiCoupon2Fill} from 'react-icons/ri'
import TextField from '@material-ui/core/TextField';
import {apicheckCoupon} from '../lib/couponapicontroller';

const Carttable = (props) => {
    const [loading,setLoading] = useState(false);
    const [cart,setCart] = React.useContext(CartContext);
    const [data,setData] = useState(undefined);
    const [, setToast] = useToasts();
    const [state, setState] = useState(false);
    const coupon = React.createRef();
    const handler = () => setState(true);

    const closeHandler = (event) => {
      setState(false);
      setLoading(false);
    }

    const couponHandler = async () => {
        setLoading(true)
        const code = coupon.current.value;
        const result = await apicheckCoupon({code: code});
        setLoading(false);
        if (result.code === 200){
            setToast({text: `${(result.data.discount)}% discount applied`,type: "success"})
            props.setDiscount({discount: result.data.discount,code: code});
        }else{
            setToast({text: `Invaild Coupon`,type: "warning"})
        }
        setState(false);
    }
    const ordertotal = (discounton) =>{
        let count = 0;
        cart.cart.forEach((e) => {
            const index = e.size.findIndex(item => item === e.choosensize)
            count += e.amount * (e.price + index * e.jprice);
        })
        return discounton ? (count * ((100 - props.discount.discount) / 100)).toFixed(2) : count.toFixed(2)
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
        const mydata = []
        if (cart.cart.length > 0)
            cart.cart.forEach((e) => {
                const index = e.size.findIndex(item => item === e.choosensize)
                mydata.push({id: e.id, size: e.size,product: `${e.name} - ${e.choosensize}`,amount: e.amount,price: (e.price + e.jprice * index), operation});
            });
        else
            setData({product: `none`, amount: `none`, operation})
        setData(mydata);
    }, [cart])

    return (
        <>
        <div className="cart-total">
        <h3 style={{textAlign: "center",color: "#FAFAFA"}}>סה”כ לתשלום : {ordertotal(true)} ₪</h3>
    {props.discount.discount !== 0 ?  <span>מחיר מקורי: {ordertotal(false)}₪</span> : null}
        </div>
        <Table data={data} hover={false}>
        <Table.Column prop="product" label="product" />
        <Table.Column prop="amount" label="amount" />
        <Table.Column prop="price" label="price" />
        <Table.Column prop="operation" label="operation" />
        </Table>
        {cart.cart.length < 1 ? 
        <Grid>                    
            <Loading type={"secondary"} size={"large"} color={"white"}>העגלה ריקה</Loading>
        </Grid>
        : 
        <>
        <Spacer/>
        <Grid.Container justify="space-evenly" alignItems="center">
            <Grid justify="space-between">
                <Button onClick={handler} ghost auto size="medium" shadow icon={<RiCoupon2Fill/>}>קופון</Button>
                <Spacer inline={true}/>
                <Button onClick={() => props.paid(true)} ghost auto size="medium" shadow icon={<MdPayment/>}>המשך לרכישה</Button>
            </Grid>
        </Grid.Container>
        </>
        }
        <Modal open={state} onClose={closeHandler}>
        <Modal.Title>הכנס קופון</Modal.Title>
        <Modal.Content style={{textAlign: "center"}}>
        <TextField disabled={loading} inputRef={coupon} id="form-code" className="label-shrink black" label="קוד" />
        </Modal.Content>
        <Modal.Action passive onClick={() => setState(false)}>חזור</Modal.Action>
        <Modal.Action loading={loading} onClick={couponHandler}>הפעל קופון</Modal.Action>
      </Modal>
        </>
    )
}

export default Carttable;