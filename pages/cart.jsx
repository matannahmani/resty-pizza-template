import {Card,Grid,Table,Button,Loading, useToasts,Image} from '@geist-ui/react';
import React,{ useEffect, useState } from 'react';
import { CartContext } from '../components/contextprovider';
import {MdPayment} from 'react-icons/md';
const Cart = () => {
    const [cart,setCart] = React.useContext(CartContext);
    const [data,setData] = useState(undefined);
    const [, setToast] = useToasts()

    const minusItem = (e) => {
        // e.size > 0 ? e.size -= 1 : e.pop()
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
                mydata.push({id: e.id, size: e.size,product: `${e.name} - ${e.size}`,amount: e.amount, operation});
            });
        else
            setData({product: `none`, amount: `none`, operation})
        setData(mydata);
    }, [cart])
    return (
        <Grid.Container className="cartcard" alignItems="center" gap={8} justify="center">
            <Grid xs={24} md={12}>
            <Card type="violet" shadow>
            <Table data={data} hover={false}>
            <Table.Column prop="product" label="product" />
            <Table.Column prop="amount" label="amount" />
            <Table.Column prop="operation" label="operation" width={150} />
            </Table>
            {cart.cart.length < 1 ? 
            <Grid>                    
                <Loading type={"secondary"} size={"large"} color={"white"}>Cart is Empty</Loading>
            </Grid>
            : 
            <>
            <Grid.Container justify="flex-end" style={{paddingTop: '16px'}} alignItems="center">
                <Grid>
                    <Button onClick={() => setToast({text: 'SOON', type: "success"})} ghost size={"small"} shadow icon={<MdPayment/>}>Check Out</Button>
                </Grid>
            </Grid.Container>
            </>
            }
            </Card>
            </Grid>
        </Grid.Container>
    )
}
export default Cart;