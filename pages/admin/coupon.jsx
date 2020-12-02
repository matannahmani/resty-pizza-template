import {Table,Text,Button,Grid,Card,useToasts,Modal,Toggle,Spacer,Input} from '@geist-ui/react';
import {useState,useEffect} from 'react';
import {TiTick,TiCancel} from 'react-icons/ti';
import {RiCoupon2Fill} from 'react-icons/ri';
import React from 'react';

const Coupon = () => {
    const operation = (actions, rowData) => {
        return <Button size="mini" shadow auto onClick={(e) => handler(rowData,actions)}>Show Modal</Button>
    }
    const enabled = (actions, rowData) => {
        return (rowData.rowValue.status) ? <TiTick fontSize="24px"/> : <TiCancel fontSize="24px"/>
    }
    const [state, setState] = useState(false)
    const [, setToast] = useToasts();
    const [coupon, setCoupon] = useState({code: '', discount: '',enabled: false});
    const cpcode = React.useRef();
    const cpdiscount = React.useRef();
    const [data,setData] = useState([
        { code: '10OFF', discount: '10%',status: false, enabled, operation },
        { code: '20OFF', discount: '20%',status: true, enabled, operation },
        ]);
    const handler = (e,actions) => {
        setCoupon({...e.rowValue,remove: actions.remove,update: actions.update});
        setState(true);
    }
    const closeHandler = (event) => {
        setState(false)
    }

    const removeHandler = () => {
        setToast({type: 'warning',text: `CODE : ${coupon.code} was removed`})
        const index = data.findIndex(e => e.code === coupon.code)
        const updatedata = [...data];
        updatedata.splice(index,1);
        setData([...updatedata]);
        setState(false);
    }
    const addCouponHandler = () => {
        setCoupon({code: '', discount: '', status: true, enabled, operation})
        setState(true);
    }
    const postCoupon = () => {
        if (cpcode.current.value.length > 2 && cpdiscount.current.value.length > 1)
        {
            if (cpdiscount.current.value > 0 && cpdiscount.current.value < 51){
                setToast({type: 'success',text: `CODE : ${cpcode.current.value} added successfully`})
                setData([...data,{...coupon,code: cpcode.current.value, discount: cpdiscount.current.value}])
                // post to server should be here
                return setState(false);
            }
        }
        setToast({type: 'error',text: 'Coupon must have 3 letters and discount is capped at 50%'})
    }
    const toggleHandler = (e) => {
        setCoupon({...coupon, status:e.target.checked})
        if (coupon.code !== ''){
            const updatedate = [...data];
            console.log(updatedate);
            const index = updatedate.findIndex((e) => e.code === coupon.code);
            updatedate[index].status = e.target.checked;
            setData([...updatedate])
            coupon.update();
            setToast({type: 'success',text: `CODE : ${coupon.code} was ${(e.target.checked) ? `enabled` : `disabled`}`})
        }
    }

      return (
        <>
        <Grid.Container alignItems={"center"} justify={"center"}>
        <Grid style={{overflow: 'auto'}} alignItems={"center"} justify={"center"}>
        <Card type="violet" shadow>
            <Text h1 size="24px" className="align-center" bold>Coupon Control Panel</Text>
        <Table hover={false} className="table-white" data={data}>
          <Table.Column prop="code" label="code" />
          <Table.Column prop="discount" label="discount" />
          <Table.Column prop="enabled" label="enabled" />
          <Table.Column prop="operation" label="operation" />
        </Table>
        <Spacer/>
        <Grid.Container justify="flex-end" alignItems="center">
            <Grid>
                <Button size="mini" shadow auto icon={<RiCoupon2Fill/>} onClick={addCouponHandler}>Add Coupon</Button>
            </Grid>
        </Grid.Container>
        </Card>
        </Grid>
        </Grid.Container>
        <Modal open={state} onClose={closeHandler}>
        <Modal.Title>Coupon</Modal.Title>
        <Modal.Subtitle>
            {(coupon.code === '') ? <>
            <Input ref={cpcode}label="code" className="no-hover" clearable width="200px" style={{textAlign: "center"}} placeholder="10OFF"></Input>
            </>
            :
            coupon.code    
        }
        </Modal.Subtitle>
        <Modal.Content>
            <Text className="align-center">
            {(coupon.discount === '') ? <>
            <Input ref={cpdiscount} label="discount" type="number" min="1" max="50" className="no-hover" clearable labelRight="%" width="200px" style={{textAlign: "center"}} placeholder="20"></Input>
            </>
            :
            coupon.discount    
        }
            </Text>
        </Modal.Content>
        <Modal.Action passive onClick={() => setState(false)}>Cancel</Modal.Action>
        <Modal.Action>{<Toggle onChange={(e) => toggleHandler(e)}  initialChecked={coupon.status}/>}</Modal.Action>
        {coupon.code === '' ? 
        <Modal.Action passive onClick={postCoupon}>Submit</Modal.Action>
        :
        <Modal.Action passive onClick={removeHandler}>Remove</Modal.Action>
        }
        </Modal>
        </>
      )
}
export default Coupon;