import {Table,Text,Button,Grid,Card,useToasts,Modal,Toggle,Spacer,Input} from '@geist-ui/react';
import {useEffect, useState} from 'react';
import {TiTick,TiCancel} from 'react-icons/ti';
import {RiCoupon2Fill} from 'react-icons/ri';
import React from 'react';
import {apipostCoupon,apigetCoupon,apipatchCoupon,apideleteCoupon} from '../../lib/couponapicontroller';
import { ShopContext } from '../../components/contextprovider';
import Router from 'next/router';

  const Coupon = () => {
    const operation = (actions, rowData) => {
        return <Button size="mini" shadow auto onClick={(e) => handler(rowData,actions)}>Show Coupon</Button>
    }
    const enabled = (actions, rowData) => {
        return (rowData.rowValue.status) ? <TiTick fontSize="24px"/> : <TiCancel fontSize="24px"/>
    }
    const [shop,setShop] = React.useContext(ShopContext);
    const [state, setState] = useState(false)
    const [, setToast] = useToasts();
    const [coupon, setCoupon] = useState({code: '', discount: '',enabled: false});
    const cpcode = React.useRef();
    const cpdiscount = React.useRef();
    const [data,setData] = useState([]);
    const resucemsg = () => {
        setShop({...shop,loading: true})
        setToast({type: 'error',text: `something went wrong!`})
        Router.replace('/')
    }
    useEffect(async () =>{
        setShop({...shop,loading: true})
        const data = await apigetCoupon();
        if (data.status === 200 && data.data !== null){
        let datalist = []
        data.data.forEach (item => {
            datalist.push({...item,discount: `${item.discount}%`,operation,enabled})
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
        setCoupon({...e.rowValue,remove: actions.remove,update: actions.update});
        setState(true);
    }
    const closeHandler = (event) => {
        setState(false)
    }

    const removeHandler = async () => {
        const index = data.findIndex(e => e.code === coupon.code)
        const result = await apideleteCoupon({id: data[index].id});
        console.log(result);
        if (result.status === 200){
            setToast({type: 'warning',text: `CODE : ${coupon.code} was removed`})
            const updatedata = [...data];
            updatedata.splice(index,1);
            setData([...updatedata]);
        }
        else {
            setToast({type: 'error',text: `ERROR`})
        }
        setState(false);
    }
    const addCouponHandler = () => {
        setCoupon({code: '', discount: '', status: true, enabled, operation})
        setState(true);
    }
    const postCoupon = async () => {
        if (cpcode.current.value.length > 2 && cpdiscount.current.value.length > 1)
        {
            if (cpdiscount.current.value > 0 && cpdiscount.current.value < 51){
                const newcp = {...coupon,code: cpcode.current.value, discount: cpdiscount.current.value};
                const result = await apipostCoupon((({ operation, enabled, ...o }) => o)(newcp) );
                if (result.status === 200){
                    newcp.id = result.data.id;
                    (data !== undefined ) ? setData([...data,{...newcp,discount: `${newcp.discount}%`}]) : setData([{...newcp,discount: `${newcp.discount}%`}]);
                    setToast({type: 'success',text: `CODE : ${cpcode.current.value} added successfully`})
                }
                else{
                    setToast({type: 'error',text: `something went wrong!`})
                }
                return setState(false);
            }
        }
        setToast({type: 'error',text: 'Coupon must have 3 letters and discount is capped at 50%'})
    }
    const toggleHandler = async (e) => {
        setShop({...shop,loading: true})
        setCoupon({...coupon, status:e.target.checked});
        if (coupon.code !== ''){
            const result = await apipatchCoupon({status: e.target.checked,id: coupon.id});
            if (result.status === 200){
                const updatedate = [...data];
                const index = updatedate.findIndex((e) => e.code === coupon.code);
                updatedate[index].status = e.target.checked;
                setData([...updatedate])
                coupon.update();
                setToast({type: 'success',text: `CODE : ${coupon.code} was ${(e.target.checked) ? `enabled` : `disabled`}`})
            }else{
                setToast({type: 'error',text: `something went wrong!`})
            }
        }
        setShop({...shop,loading: false})
    }

      return (
          <>
        <Grid.Container alignItems={"center"} justify={"center"}>
        <Grid style={{overflow: 'auto'}} alignItems={"center"} justify={"center"}>
        <Card type="violet" shadow>
            <Text h1 size="24px" className="align-center">Coupon Control Panel</Text>
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
            <Input ref={cpcode}label="code" className="no-hover" clearable width="200px" style={{textAlign: "center"}} placeholder="10OFF"/>
            </>
            :
            <span>{coupon.code}</span>
        }
        <Spacer/>
        </Modal.Subtitle>
        <Modal.Content>
        <Text className="align-center">
            {(coupon.discount === '') ? <>
            <Input ref={cpdiscount} label="discount" type="number" min="1" max="50" className="no-hover" clearable labelRight="%" width="200px" style={{textAlign: "center"}} placeholder="20"></Input>
            </>
            :
            <span>{coupon.discount}</span>
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