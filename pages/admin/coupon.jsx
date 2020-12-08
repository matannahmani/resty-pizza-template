import {Table,Text,Button,Grid,Card,useToasts,Modal,Toggle,Spacer,Input} from '@geist-ui/react';
import {useState} from 'react';
import {TiTick,TiCancel} from 'react-icons/ti';
import {RiCoupon2Fill} from 'react-icons/ri';
import React from 'react';
import {apipostCoupon,apigetCoupon,apipatchCoupon,apideleteCoupon} from '../../lib/apicontroller';
  const Coupon = (props) => {
    const operation = (actions, rowData) => {
        return <Button size="mini" shadow auto onClick={(e) => handler(rowData,actions)}>Show Coupon</Button>
    }
    const enabled = (actions, rowData) => {
        return (rowData.rowValue.status) ? <TiTick fontSize="24px"/> : <TiCancel fontSize="24px"/>
    }
    const dataHandler = () =>{
        // to do add checking if array
        if (props.code === 200)
        {
            let datalist = []
            props.data.forEach (item => {
                datalist.push({...item,discount: `${item.discount}%`,operation,enabled})
            });
            return datalist;
        }
        else{
            return []
        }
    }
    const [state, setState] = useState(false)
    const [, setToast] = useToasts();
    const [coupon, setCoupon] = useState({code: '', discount: '',enabled: false});
    const cpcode = React.useRef();
    const cpdiscount = React.useRef();
    const [data,setData] = useState(dataHandler);

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
        apideleteCoupon({id: index});
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
                setToast({type: 'success',text: `CODE : ${cpcode.current.value} added successfully`})
                const newcp = {...coupon,code: cpcode.current.value, discount: cpdiscount.current.value};
                const result = await apipostCoupon((({ operation, enabled, ...o }) => o)(newcp) );
                if (result.code === 200){
                    newcp.id = result.data.id;
                    (data !== undefined ) ? setData([...data,newcp]) : setData([newcp]);

                }
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
            apipatchCoupon({status: e.target.checked,id: coupon.id});
            setToast({type: 'success',text: `CODE : ${coupon.code} was ${(e.target.checked) ? `enabled` : `disabled`}`})
        }
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
export const getStaticProps = async () => {
    // Get external data from the file system, API, DB, etc.
    const data = await apigetCoupon();
    const unseralized = [];
    await data.data.data.forEach(i => unseralized.push(i.attributes)); // please fix in the future it hurts my eyes jesus fast api what a mess
    return {
      props: {data: unseralized,code: data.code}
    }
  }