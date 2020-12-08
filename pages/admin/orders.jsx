import {Table,Text,Button,Grid,Card,useToasts,Modal,Toggle,Spacer,Input} from '@geist-ui/react';
import {useState} from 'react';
import {TiTick,TiCancel} from 'react-icons/ti';
import {RiTakeawayFill,RiRestaurantFill} from 'react-icons/ri';
import React from 'react';

const order = () => {
    const operation = (actions, rowData) => {
        return (
        [<Button key="close-order" size="mini" auto shadow onClick={() => removeHandler(rowData)}>Close Order</Button>,
        <Spacer key="spacer-order"/>,
        <Button key="show-order" size="mini" auto shadow onClick={(e) => handler(rowData,actions)}>Show Order</Button>]
        )
    }
    const shipped = (actions, rowData) => {
        return (rowData.rowValue.isshipped) ? <TiTick fontSize="24px"/> : <TiCancel fontSize="24px"/>
    }
    const deliverytype = (actions, rowData) => {
        return (rowData.rowValue.takeaway) ? <RiRestaurantFill fontSize="24px"/> : <RiTakeawayFill fontSize="24px"/>
    }
    const pizzalist = (actions, rowData) => {
        return rowData.rowValue.items.map((e,index) => <Text key={index} style={{margin: '4px 0px'}}>{e[0]} - {e[1]}</Text>)
        // return string
    }
    const [state, setState] = useState(false)
    const [, setToast] = useToasts();
    const [order, setOrder] = useState({products: '', delivery: '',isshipped: false});
    const cpcode = React.useRef();
    const cpdiscount = React.useRef();
    const [data,setData] = useState([
        { name: 'Matan Nahmani', address: 'Kliel ha Horesh 26', items: [['Pepperoni Pizza',2],['Shrimps Pizza',3]], takeaway: false,isshipped: false, shipped, delivery: deliverytype, operation, products: pizzalist},
        { name: 'Matan Nahmani', address: 'Kliel ha Horesh 27', items: [['Pepperoni Pizza',2],['Shrimps Pizza',3]], takeaway: false,isshipped: false, shipped, delivery: deliverytype, operation, products: pizzalist}
        ]);
    const handler = (e,actions) => {
        setOrder({...e.rowValue,remove: actions.remove,update: actions.update});
        setState(true);
    }
    const closeHandler = (event) => {
        setState(false)
    }

    const removeHandler = (rowData) => {
        const index = data.findIndex(e => e.name === rowData.rowValue.name && e.address === rowData.rowValue.address )
        if (confirm(`Are you sure you want to close order ${index+1}`)){    
            setToast({type: 'warning',text: `Order : ${index+1} was removed`})
            const updatedata = [...data];
            updatedata.splice(index,1);
            setData([...updatedata]);
            setState(false);
        }
    }
    const addCouponHandler = () => {
        setOrder({products: '', delivery: '', status: true, shipped, operation})
        setState(true);
    }
    const postCoupon = () => {
        if (cpcode.current.value.length > 2 && cpdiscount.current.value.length > 1)
        {
            if (cpdiscount.current.value > 0 && cpdiscount.current.value < 51){
                setToast({type: 'success',text: `products : ${cpcode.current.value} added successfully`})
                setData([...data,{...order,products: cpcode.current.value, delivery: cpdiscount.current.value}])
                // post to server should be here
                return setState(false);
            }
        }
        setToast({type: 'error',text: 'order must have 3 letters and delivery is capped at 50%'})
    }
    const toggleHandler = (e) => {
        setOrder({...order, isshipped:e.target.checked})
        if (order.items !== ''){
            const updatedate = [...data];
            const index = updatedate.findIndex((e) => e.name === order.name && e.address === order.address && e.items === order.items);
            updatedate[index].isshipped = e.target.checked;
            setData([...updatedate])
            order.update();
            setToast({type: 'success',text: `Order : ${index+1} was ${(e.target.checked) ? `shipped` : `disabled`}`})
        }
    }

      return (
        <>
        <Grid.Container alignItems={"center"} justify={"center"}>
        <Grid style={{overflow: 'auto'}} alignItems={"center"} justify={"center"}>
        <Card type="violet" shadow>
        <Text h1 size="24px" className="align-center">Total orders : {data.length}</Text>
        <Table hover={false} className="table-white" data={data}>
          <Table.Column prop="name" label="name" />
          <Table.Column prop="address" label="address" />
          <Table.Column prop="products" label="products" width={200} />
          <Table.Column prop="delivery" label="delivery" />
          <Table.Column prop="shipped" label="shipped" />
          <Table.Column c prop="operation" label="operation" />
        </Table>
        </Card>
        </Grid>
        </Grid.Container>
        <Modal open={state} onClose={closeHandler}>
        <Modal.Title>Order Number : {data.findIndex(e => e.name === order.name && e.address === order.address && e.items === order.items ) +1}</Modal.Title>
        <Modal.Subtitle>
            {order.items !== undefined ? order.items.map((e,index) => <Text key={index} style={{margin: '4px 0px'}}>{e[0]} - {e[1]}</Text>) : null}
        </Modal.Subtitle>
        <Modal.Content>
        <Text className="align-center">
            {(order.address === '') ? <>
            <Input ref={cpdiscount} label="delivery" type="number" min="1" max="50" className="no-hover" clearable labelRight="%" width="200px" style={{textAlign: "center"}} placeholder="20"></Input>
            </>
            :
            <span><br/>Name: {order.name} <br/> Address :{order.address}</span>
        }
            </Text>
        </Modal.Content>
        <Modal.Action passive onClick={() => setState(false)}>Cancel</Modal.Action>
        <Modal.Action>
            <div className="toggle-btn">
            <Text size={'16px'}>Shipped {<RiTakeawayFill/>}</Text>
            {<Toggle disabled={order.isshipped} onChange={(e) => toggleHandler(e)}  initialChecked={order.isshipped}/>}
            </div>
        </Modal.Action>
        </Modal>
        </>
      )
}
export default order;