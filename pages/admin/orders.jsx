import {Table,Text,Button,Grid,Card,useToasts,Modal,Toggle,Spacer,Input} from '@geist-ui/react';
import {useEffect, useState} from 'react';
import {TiTick,TiCancel} from 'react-icons/ti';
import {RiTakeawayFill,RiRestaurantFill} from 'react-icons/ri';
import React from 'react';
import {apigetOrder,apipatchOrder} from '../../lib/orderapicontroller';
import { ShopContext } from '../../components/contextprovider';
import Router from 'next/router';

  const Order = () => {
    const operation = (actions, rowData) => {
        return <Button size="mini" shadow auto onClick={(e) => handler(rowData,actions)}>Show Order</Button>
    }
    const enabled = (actions, rowData) => {
        return (rowData.rowValue.shipped) ? <TiTick fontSize="24px"/> : <TiCancel fontSize="24px"/>
    }
    const date = (actions, rowData) => {
        const date = new Date(rowData.rowValue.created_at).toLocaleTimeString('he-IL', {day: '2-digit',month: '2-digit',hour: '2-digit', minute:'2-digit'});
        return <Text>{date}</Text>
    }
    const pdlist = (list) => {
        return list.map( (e) => {
            return (
            <Text key={e} style={{textAlign: 'center'}}>{e[0]} {e[2]} {e[1]}</Text>
            )});
    }
    const description = (actions ,rowData) => {
        return pdlist(rowData.rowValue.productlist);
    }
    const deliverytype = (actions, rowData) => {
        return rowData.rowValue.takeaway ?
        (<Text>Delivery <RiTakeawayFill/></Text>)
        : (<Text>Takeaway <RiRestaurantFill/></Text>)
    }
    const [shop,setShop] = React.useContext(ShopContext);
    const [state, setState] = useState(false)
    const [, setToast] = useToasts();
    const [order, setOrder] = useState({date: '', description: '',takeaway: false,phone: '',address: '',productlist: [],name: '',shipped: false,done: false});
    const [data,setData] = useState([]);
    const resucemsg = () => {
        setShop({...shop,loading: true})
        setToast({type: 'error',text: `something went wrong!`})
        Router.replace('/')
    }
    useEffect(async () =>{
        setShop({...shop,loading: true})
        const data = await apigetOrder();
        const unseralized = [];
        if (data.code === 200 && data.data !== null){
        await data.data.data.forEach(i => unseralized.push(i.attributes)); // please fix in the future it hurts my eyes jesus fast api what a mess
        let datalist = []
        unseralized.forEach (item => {
            datalist.push({...item,date,deliverytype,description,operation,enabled})
        });
        setData(datalist);
        setShop({...shop,loading: false});
    }
    else if (data.code === 500){
        resucemsg();
    }
        setShop({...shop,loading: false})
    },[]);
    const handler = (e,actions) => {
        setOrder({...e.rowValue,remove: actions.remove,update: actions.update});
        setState(true);
    }
    const closeHandler = (event) => {
        setState(false)
    }

    const removeHandler = async () => { // marks as done
        const result = await apipatchOrder({done: true,id: order.id,shipped: order.shipped});
        if (result.code === 200){
            const index = data.findIndex(e => e.id === order.id)
            const updatedata = [...data];
            updatedata.splice(index,1); // pops from clone array of data
            setData([...updatedata]) // set data
            setToast({type: 'warning',text: `Order : ${order.id} was removed`})
        }else{
            setToast({type: 'error',text: `something went wrong!`})
        }
        setShop({...shop,loading: false});
        setState(false);
    }

    const toggleHandler = async (e) => {
        setShop({...shop,loading: true})
        setOrder({...order, shipped: e.target.checked});
        const result = await apipatchOrder({id: order.id,shipped: e.target.checked});
        if (result.code === 200){
                const updatedate = [...data];
                const index = updatedate.findIndex((e) => e.id === order.id); // finds the order
                updatedate[index].shipped = e.target.checked; // changes shipped to true
                setData([...updatedate]) // updates data
                order.update(); // update data on table
                setToast({type: 'success',text: `Order : ${order.id} was ${(e.target.checked) ? `shipped` : `unshipped`}`})
            }else{
                setToast({type: 'error',text: `something went wrong!`})
        }
        setShop({...shop,loading: false})
    }

      return (
          <>
        <Grid.Container alignItems={"center"} justify={"center"}>
        <Grid style={{overflow: 'auto'}} alignItems={"center"} justify={"center"}>
        <Card type="violet" shadow>
            <Text h1 size="24px" className="align-center">Order Control Panel</Text>
        <Table hover={false} className="table-white" data={data}>
          <Table.Column prop="date" label="date" />
          <Table.Column width="200" prop="name" label="name" />
          <Table.Column width="200" prop="description" label="description" />
          <Table.Column prop="deliverytype" label="deliverytype" />
          <Table.Column prop="operation" label="operation" />
        </Table>
        <Spacer/>
        <Grid.Container justify="flex-end" alignItems="center">

        </Grid.Container>
        </Card>
        </Grid>
        </Grid.Container>
        <Modal open={state} onClose={closeHandler}>
        <Modal.Title>order {order.id}</Modal.Title>
        <Modal.Content>
        {order.productlist !== undefined && pdlist(order.productlist)}
        <Spacer/>
        <Input readOnly width="300px" label="DeliveryType" initialValue={ order.takeaway ? 'delivery' : 'takeaway' } />
        <Spacer/>
        <Input readOnly label="Name" initialValue={order.name} />
        <Spacer/>
        <Input readOnly label="Address" initialValue={order.address} />
        <Spacer/>
        <Input readOnly label="Phone" initialValue={order.phone} />
        <Spacer/>
        <Input readOnly label="Shipped" value={order.shipped} />
        </Modal.Content>
        <Modal.Action className="column-btn">
        <Text>Shipped <RiTakeawayFill/></Text>
        {<Toggle onChange={(e) => toggleHandler(e)}  initialChecked={order.shipped}/>}
        </Modal.Action>
        <Modal.Action passive onClick={removeHandler}>Remove</Modal.Action>
        </Modal>
        </>
      )
}

export default Order;