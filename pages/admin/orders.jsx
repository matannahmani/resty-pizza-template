import {Table,Text,Button,Grid,Card,useToasts,Modal,Toggle,Spacer,Input} from '@geist-ui/react';
import {useState,useEffect} from 'react';
import {TiTick,TiCancel} from 'react-icons/ti';
import {RiCoupon2Fill} from 'react-icons/ri';
import React from 'react';

const orders = () => {
    const operation = (actions, rowData) => {
        return (
        [<Button key="close-order" size="mini" shadow auto onClick={removeHandler}>Close Order</Button>,
        <Spacer key="spacer-order"/>,
        <Button key="show-order" size="mini" shadow auto onClick={(e) => handler(rowData,actions)}>Show orders</Button>]
        )
    }
    const shipped = (actions, rowData) => {
        return (rowData.rowValue.status) ? <TiTick fontSize="24px"/> : <TiCancel fontSize="24px"/>
    }
    const [state, setState] = useState(false)
    const [, setToast] = useToasts();
    const [orders, setCoupon] = useState({code: '', discount: '',shipped: false});
    const cpcode = React.useRef();
    const cpdiscount = React.useRef();
    const [data,setData] = useState([
        { code: '10OFF', discount: '10%',status: false, shipped, operation },
        { code: '20OFF', discount: '20%',status: true, shipped, operation },
        ]);
    const handler = (e,actions) => {
        setCoupon({...e.rowValue,remove: actions.remove,update: actions.update});
        setState(true);
    }
    const closeHandler = (event) => {
        setState(false)
    }

    const removeHandler = () => {
        setToast({type: 'warning',text: `CODE : ${orders.code} was removed`})
        const index = data.findIndex(e => e.code === orders.code)
        const updatedata = [...data];
        updatedata.splice(index,1);
        setData([...updatedata]);
        setState(false);
    }
    const addCouponHandler = () => {
        setCoupon({code: '', discount: '', status: true, shipped, operation})
        setState(true);
    }
    const postCoupon = () => {
        if (cpcode.current.value.length > 2 && cpdiscount.current.value.length > 1)
        {
            if (cpdiscount.current.value > 0 && cpdiscount.current.value < 51){
                setToast({type: 'success',text: `CODE : ${cpcode.current.value} added successfully`})
                setData([...data,{...orders,code: cpcode.current.value, discount: cpdiscount.current.value}])
                // post to server should be here
                return setState(false);
            }
        }
        setToast({type: 'error',text: 'orders must have 3 letters and discount is capped at 50%'})
    }
    const toggleHandler = (e) => {
        setCoupon({...orders, status:e.target.checked})
        if (orders.code !== ''){
            const updatedate = [...data];
            console.log(updatedate);
            const index = updatedate.findIndex((e) => e.code === orders.code);
            updatedate[index].status = e.target.checked;
            setData([...updatedate])
            orders.update();
            setToast({type: 'success',text: `CODE : ${orders.code} was ${(e.target.checked) ? `shipped` : `disabled`}`})
        }
    }

      return (
        <>
        <Grid.Container alignItems={"center"} justify={"center"}>
        <Grid style={{overflow: 'auto'}} alignItems={"center"} justify={"center"}>
        <Card type="violet" shadow>
        <Text h1 size="24px" className="align-center">Total Orders : {data.length}</Text>
        <Table hover={false} className="table-white" data={data}>
          <Table.Column prop="name" label="name" />
          <Table.Column prop="address" label="address" />
          <Table.Column prop="code" label="code" />
          <Table.Column prop="discount" label="discount" />
          <Table.Column prop="shipped" label="shipped" />
          <Table.Column prop="operation" label="operation" />
        </Table>
        <Spacer/>
        <Grid.Container justify="flex-end" alignItems="center">
            <Grid>
                <Button size="mini" shadow auto icon={<RiCoupon2Fill/>} onClick={addCouponHandler}>Add orders</Button>
            </Grid>
        </Grid.Container>
        </Card>
        </Grid>
        </Grid.Container>
        <Modal open={state} onClose={closeHandler}>
        <Modal.Title>orders</Modal.Title>
        <Modal.Subtitle>
            {(orders.code === '') ? <>
            <Input ref={cpcode}label="code" className="no-hover" clearable width="200px" style={{textAlign: "center"}} placeholder="10OFF"/>
            </>
            :
            <span>{orders.code}</span>
        }
        </Modal.Subtitle>
        <Modal.Content>
        <Text className="align-center">
            {(orders.discount === '') ? <>
            <Input ref={cpdiscount} label="discount" type="number" min="1" max="50" className="no-hover" clearable labelRight="%" width="200px" style={{textAlign: "center"}} placeholder="20"></Input>
            </>
            :
            <span>{orders.discount}</span>
        }
            </Text>
        </Modal.Content>
        <Modal.Action passive onClick={() => setState(false)}>Cancel</Modal.Action>
        <Modal.Action>{<Toggle onChange={(e) => toggleHandler(e)}  initialChecked={orders.status}/>}</Modal.Action>
        {orders.code === '' ? 
        <Modal.Action passive onClick={postCoupon}>Submit</Modal.Action>
        :
        <Modal.Action passive onClick={removeHandler}>Remove</Modal.Action>
        }
        </Modal>
        </>
      )
}
export default orders;