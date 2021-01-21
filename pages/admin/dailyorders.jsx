import {Table,Text,Button,Grid,Card,useToasts,Modal,Note,Spacer,Input} from '@geist-ui/react';
import {useEffect, useState} from 'react';
import {TiTick,TiCancel} from 'react-icons/ti';
import {RiTakeawayFill,RiRestaurantFill} from 'react-icons/ri';
import React from 'react';
import {apigetDailyOrders} from '../../lib/orderapicontroller';
import { ShopContext } from '../../components/contextprovider';
import Router from 'next/router';

  const DailyOrders = () => {
    const operation = (actions, rowData) => {
        return <Button size="mini" shadow auto onClick={(e) => handler(rowData,actions)}>Show Order</Button>
    }
    const enabled = (actions, rowData) => {
        return (rowData.rowValue.shipped) ? <TiTick fontSize="24px"/> : <TiCancel fontSize="24px"/>
    }

    const toTime = (time) => {
        return new Date(time).toLocaleTimeString('he-IL', {day: '2-digit',month: '2-digit',hour: '2-digit', minute:'2-digit'})
    }

    const date = (actions, rowData) => {
        return <Text>{toTime(rowData.rowValue.created_at)}</Text>
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
    const input = React.createRef()
    const [refund,setRefund] = useState({refund: false,msgloading: false,waiting: false});
    const resucemsg = () => {
        setShop({...shop,loading: true})
        setToast({type: 'error',text: `something went wrong!`})
        Router.replace('/')
    }
    useEffect(async () =>{
        setShop({...shop,loading: true})
        const data = await apigetDailyOrders();
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
        setRefund({refund: false,msgloading: false,waiting: false})
        setState(false)
    }
    
    const refundHandler = () => {
        if (!refund.msgloading && !refund.waiting) return setRefund({...refund,msgloading: true})
        if (refund.msgloading && refund.waiting)
        {
            // issue refund
        }
    }

    const inputHandler = (e) =>{
        if (parseInt(e.target.value) === order.id)
        setRefund({...refund,msgloading: true,waiting: true})
        else
        setRefund({...refund,msgloading: true,waiting: false})
    }


      return (
          <>
        <Grid.Container alignItems={"center"} justify={"center"}>
        <Grid style={{overflow: 'auto'}} alignItems={"center"} justify={"center"}>
        <Card type="violet" shadow>
            <Text h1 size="24px" className="align-center">Today Orders : {data.length}</Text>
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
        <Spacer/>
        <Input readOnly label="Shipped" value={toTime(order.created_at)} />
        </Modal.Content>
        <Spacer/>
        { refund.msgloading &&
        <>
        <Note type="error">Please write order ID.</Note>
        <Spacer/>
        <div className="align-center">
            <Input ref={input} onChange={(e) => inputHandler(e)} status="error" width="100px" placeholder={order.id}/>
        </div>
        <Spacer/>
        </>
        }
        <Button shadow onClick={refundHandler} loading={refund.msgloading && !refund.waiting} type="error-light">Refund</Button>
        </Modal>
        </>
      )
}

export default DailyOrders;