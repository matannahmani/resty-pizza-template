import {Card,Grid,Table,Button,Text, useToasts} from '@geist-ui/react';
import React,{ useEffect, useState } from 'react';
import { CartContext } from '../components/contextprovider';
export default () => {
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
                    const updatecart = [...cart.cart]
                    updatecart[rowData.row].amount += 1;
                    setCart({...cart,cart: updatecart})
                    setToast({text: `${rowData.rowValue.product} was added`,type: "success"})
                }}>+</Button>
                <Button type="error" auto size="mini" onClick={() => {
                    if (cart.cart[rowData.row].amount > 1){
                        const updatecart = [...cart.cart]
                        updatecart[rowData.row].amount -= 1;
                        setCart({...cart,cart: updatecart})
                    }
                    else{
                        setToast({text: `${rowData.rowValue.product} was removed`,type: "warning"})
                        cart.cart.splice(rowData.row)
                        actions.remove()
                        console.log(cart);
                    }
                
                }}>-</Button>
            </>
        )
    }
    useEffect(() => {
        console.log(cart);
        const mydata = []
        if (cart.cart.length > 0)
            cart.cart.forEach((e) => {
                mydata.push({product: `${e.name} - ${e.size}`,amount: e.amount, operation});
            });
        else
            setData({product: `none`, amount: `none`, operation})
        setData(mydata);
    }, [cart])
    return (
        <Grid.Container alignItems="center" gap={8} justify="center">
            <Grid xs={24} md={12}>
            <Card type="violet" shadow>
            <Table data={data} hover={false}>
            <Table.Column prop="product" label="product" />
            <Table.Column prop="amount" label="amount" />
            <Table.Column prop="operation" label="operation" width={150} />
            </Table>
            </Card>
            </Grid>
        </Grid.Container>
    )
}