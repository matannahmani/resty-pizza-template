import {Table,Text,Button,Grid,Card,useToasts,Modal,Toggle,Spacer,Input,Image} from '@geist-ui/react';
import {useState,useEffect} from 'react';
import {TiTick,TiCancel} from 'react-icons/ti';
import {FaPizzaSlice} from 'react-icons/fa';
import React from 'react';

const Products = () => {
    const operation = (actions, rowData) => {
        return <Button size="mini" shadow auto onClick={(e) => handler(rowData,actions)}>Show Pizza</Button>
    }
    const enabled = (actions, rowData) => {
        return (rowData.rowValue.status) ? <TiTick fontSize="24px"/> : <TiCancel fontSize="24px"/>
    }
    const [state, setState] = useState(false)
    const [, setToast] = useToasts();
    const [pizza, setPizza] = useState({name: '', price: '', img: '',status: false, enabled: false});
    const pzcode = React.useRef();
    const pzdiscount = React.useRef();
    const pzimg = React.useRef();
    const [data,setData] = useState([
        { name: 'Pepperoni', price: '12.00',img: 'pizza1',status: false, enabled, operation },
        { name: 'Shrimps', price: '13.00',img: 'pizza1',status: true, enabled, operation },
        ]);
    const handler = (e,actions) => {
        setPizza({...e.rowValue,remove: actions.remove,update: actions.update});
        setState(true);
    }
    const closeHandler = (event) => {
        setState(false)
    }
    const removeHandler = () => {
        setToast({type: 'warning',text: `${pizza.name} Pizza was removed`})
        const index = data.findIndex(e => e.name === pizza.name)
        const updatedata = [...data];
        updatedata.splice(index,1);
        setData([...updatedata]);
        setState(false);
    }
    const addPizzaHandler = () => {
        setPizza({name: '', price: '', img: '',status: true, enabled, operation})
        setState(true);
    }
    const postPizza = () => {
        if (pzcode.current.value.length > 2 && pzdiscount.current.value.length > 1)
        {
            if (pzdiscount.current.value > 0 && pzdiscount.current.value < 201){
                const previewImage = document.getElementById('preview-img');

                setToast({type: 'success',text: `name : ${pzcode.current.value} added successfully`})
                setData([...data,{...pizza,name: pzcode.current.value,img: previewImage.src, price: pzdiscount.current.value}])
                // post to server should be here
                return setState(false);
            }
        }
        setToast({type: 'error',text: 'Pizza must have 3 letters and price is capped at 50%'})
    }
    const toggleHandler = (e) => {
        setPizza({...pizza, status:e.target.checked})
        if (pizza.name !== ''){ // not new pizza
            const updatedate = [...data];
            const index = updatedate.findIndex((e) => e.name === pizza.name);
            updatedate[index].status = e.target.checked;
            setData([...updatedate])
            pizza.update();
            setToast({type: 'success',text: `name : ${pizza.name} was ${(e.target.checked) ? `enabled` : `disabled`}`})
        }
    }
    const loadImageHandler = (e) => {
        const previewImage = document.getElementById('preview-img');
        previewImage.src = URL.createObjectURL(e.target.files[0]);
        // here will be a post then state change
        const updatedata = [...data];
        const index = updatedata.findIndex((e) => e.name === pizza.name)
        if (index !== null && pizza.name !== ''){
            console.log(URL.createObjectURL(e.target.files[0]))
            updatedata[index].img = URL.createObjectURL(e.target.files[0]); // switch with post source
            setData([...updatedata]);
        }
            
    }

      return (
        <>
        <Grid.Container alignItems={"center"} justify={"center"}>
        <Grid style={{overflow: 'auto'}} alignItems={"center"} justify={"center"}>
        <Card type="violet" shadow>
            <Text h1 size="24px" className="align-center">Products Control Panel</Text>
        <Table hover={false} className="table-white" data={data}>
          <Table.Column prop="name" label="name" />
          <Table.Column prop="price" label="price" />
          <Table.Column prop="enabled" label="enabled" />
          <Table.Column prop="operation" label="operation" />
        </Table>
        <Spacer/>
        <Grid.Container justify="flex-end" alignItems="center">
            <Grid>
                <Button size="mini" shadow auto icon={<FaPizzaSlice/>} onClick={addPizzaHandler}>Add pizza</Button>
            </Grid>
        </Grid.Container>
        </Card>
        </Grid>
        </Grid.Container>
        <Modal open={state} onClose={closeHandler}>
        <Modal.Title>Pizza</Modal.Title>
        <Spacer/>
        <Modal.Subtitle>
            
            {(pizza.name === '') ? <>
            <Input ref={pzcode}label="name" className="no-hover" clearable width="200px" style={{textAlign: "center"}} placeholder="Pepperoni"></Input>
            </>
            :
            pizza.name    
        }
        </Modal.Subtitle>
        <Spacer/>
        <Modal.Content>
            <Text className="align-center">
            {(pizza.price === '') ? <>
            <Input ref={pzdiscount} label="price" type="number" min="1" max="200" className="no-hover" clearable labelRight="$" width="200px" style={{textAlign: "center"}} placeholder="9.99"></Input>
            </>
            :
            pizza.price
        }
            </Text>
            {(pizza.img === '') ? 
            <>
            <Image id="preview-img" src={(pizza.img.includes('blob')) ? pizza.img : `../pizza1.png`} width={160} height={160}/>
            <Spacer/>
            <input ref={pzimg} accept="image/x-png,image/gif,image/jpeg" onChange={(e) => loadImageHandler(e)} className="align-center" type="file" />
            </>
            :
            <>
            <Image id="preview-img" src={(pizza.img !== undefined) ? (pizza.img.includes('blob')) ? pizza.img : `../pizza1.png` : '../pizza1.png'} width={160} height={160}/>
            <Spacer/>
            <input ref={pzimg} accept="image/x-png,image/gif,image/jpeg" onChange={(e) => loadImageHandler(e)} className="align-center" type="file" />
            </>
            }
        </Modal.Content>
        <Spacer/>
        <Modal.Action passive onClick={() => setState(false)}>Cancel</Modal.Action>
        <Modal.Action>{<Toggle onChange={(e) => toggleHandler(e)}  initialChecked={pizza.status}/>}</Modal.Action>
        {pizza.name === '' ? 
        <Modal.Action passive onClick={postPizza}>Submit</Modal.Action>
        :
        <Modal.Action passive onClick={removeHandler}>Remove</Modal.Action>
        }
        </Modal>
        </>
      )
}
export default Products;