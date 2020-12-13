import {Table,Text,Button,Grid,Card,useToasts,Modal,Toggle,Spacer,Input,Image,Loading,Textarea,Checkbox} from '@geist-ui/react';
import {useState} from 'react';
import {TiTick,TiCancel} from 'react-icons/ti';
import {FaPizzaSlice} from 'react-icons/fa';
import React from 'react';
import {apipostProduct,apigetProduct,apipatchProduct,apideleteProduct} from '../../lib/pizzaapicontroller';

const Products = (props) => {
    const operation = (actions, rowData) => {
        return <Button size="mini" shadow auto onClick={(e) => handler(rowData,actions)}>Show Pizza</Button>
    }
    const enabled = (actions, rowData) => {
        return (rowData.rowValue.status) ? <TiTick fontSize="24px"/> : <TiCancel fontSize="24px"/>
    }
    const shortdes = (actions, rowData) => {
        return (<Text small>{rowData.rowValue.description !== null ? rowData.rowValue.description.substring(0,50): 'no description'}</Text>)
    }
    const dataHandler = () =>{
        // to do add checking if array
        if (props.code === 200)
        {
            let datalist = []
            props.data.forEach (item => {
                console.log(item);
                datalist.push({...item,photo: item.photo_url,key: item.id,operation,enabled,shortdes})
            });
            return datalist;
        }
        else{
            return []
        }
    }
    const [state, setState] = useState(false)
    const [, setToast] = useToasts();
    const [pizza, setPizza] = useState({name: '', price: '',jprice: '', photo: '',size: [],status: true,description: '',operation,enabled,shortdes});
    const pzcode = React.useRef();
    const pzprice = React.useRef();
    const pzjprice = React.useRef();
    const pzdesc = React.useRef();
    const pzphoto = React.useRef();
    const [data,setData] = useState(dataHandler);
    const [upload,setLoading] = useState(false);
    const [isupdating,setUpdate] = useState(false);
    const [dataimage,setImage] = useState(undefined);

    const handler = (e,actions) => {
        setPizza({...e.rowValue,remove: actions.remove,update: actions.update});
        setState(true);
    }
    const closeHandler = (event) => {
        setState(false)
        setUpdate(false);
    }
    const removeHandler = () => {
        if (confirm(`are you sure you want to delete ${pizza.name}`)){
        setToast({type: 'warning',text: `${pizza.name} Pizza was removed`})
        const index = data.findIndex(e => e.name === pizza.name)
        const updatedata = [...data];
        updatedata.splice(index,1);
        setData([...updatedata]);
        apideleteProduct({id: data[index].id});
        setState(false);
        }
    }
    const addPizzaHandler = () => {
        setPizza({name: '', price: '',jprice: '', photo: '',size: ["M","XL","XXL","55CM"],status: true,description: '',enabled,operation,shortdes})
        setState(true);
    }
    const postPizza = async (updatepizza) => { // post / patch
        if (pzcode.current.value.length > 2 && pzprice.current.value.length > 1 && pzdesc.current.value.length > 10 && (pzphoto.current.files.length > 0 || isupdating))
        {
            if (pzprice.current.value > 0 && pzprice.current.value < 201){
                const previewImage = document.getElementById('preview-img');
                const newcp = {...pizza,description: pzdesc.current.value, name: pzcode.current.value,photo: previewImage.src, price: pzprice.current.value, jprice: pzjprice.current.value};
                setLoading(true);
                let result;
                if (updatepizza)
                {
                    result = await apipatchProduct((({ operation, enabled,shortdes,key,photo_url,photo, ...o }) => o)({...newcp,photodata: dataimage}) );
                }
                else
                {
                    result = await apipostProduct((({ operation, enabled,shortdes,key,photo, ...o }) => o)({...newcp,photodata: dataimage}) );
                }
                if (result.code === 200){
                    if (!updatepizza)
                    {
                        newcp.id = result.data.id;
                        delete newcp.data;
                        (data !== undefined ) ? setData([...data,{...newcp,photodata: null,shortdes}]) : setData([{...newcp,photodata: null,shortdes}]);
                        setToast({type: 'success',text: `name : ${newcp.name} added successfully`})
                    }else
                    {
                        const updatedata = [...data]
                        const updateindex = updatedata.findIndex(e => e.id === pizza.id);
                        updatedata[updateindex] = {...updatedata[updateindex],...newcp}
                        setData(updatedata);
                        setToast({type: 'success',text: `name : ${newcp.name} was updated successfully`})
                    }
                }
                else{
                    setToast({type: 'warning',text: `Something went wrong try again later`})
                }
                setImage(undefined);
                setLoading(false);
                return setState(false);
            }
        }
        setToast({type: 'error',text: 'Pizza must have 3 letters and price is capped at 250'})
    }
    
    const toggleHandler = (e) => {
        setPizza({...pizza, status:e.target.checked})
    }

    const sizeHandler = (e) => {
        setPizza({...pizza,size: e})
    }

    const loadImageHandler = async (e) => {
        const previewImage = document.getElementById('preview-img');
        previewImage.src = URL.createObjectURL(e.target.files[0]);
        const result = await toDataURL(previewImage.src);
        const updatedata = [...data];
        const index = updatedata.findIndex((e) => e.name === pizza.name)
        if (index !== null && pizza.name !== ''){
            updatedata[index].photo = URL.createObjectURL(e.target.files[0]); // switch with post source
            updatedata[index].data = result; // base64 of image
            setData([...updatedata]);
        }
        setImage(result);
        await setPizza({...pizza,photodata: result});
    }

    const toDataURL = url => fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    }))

      return (
        <>
        <Grid.Container alignItems={"center"} justify={"center"}>
        <Grid style={{overflow: 'auto'}} alignItems={"center"} justify={"center"}>
        <Card type="violet" shadow>
            <Text h1 size="24px" className="align-center">Products Control Panel</Text>
        <Table hover={false} className="table-white" data={data}>
          <Table.Column prop="name" label="name" />
          <Table.Column prop="price" label="price" />
          <Table.Column prop="shortdes" label="description" width={120}/>
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
            <Input ref={pzcode}label="name" className="no-hover" clearable width="200px" style={{textAlign: "center"}} disabled={upload} placeholder="Pepperoni"></Input>
            </>
            :
            <Input ref={pzcode}label="name" className="no-hover" clearable width="200px" style={{textAlign: "center"}} disabled={!isupdating || upload} initialValue={pizza.name}></Input>}
        </Modal.Subtitle>
        <Spacer/>
        <Modal.Content>
            <Text className="align-center">
            {(pizza.price === '') ?
            [<Input ref={pzprice} label="Price" type="number" min="1" max="200" className="no-hover" clearable labelRight="$" width="200px" disabled={upload} style={{textAlign: "center"}} placeholder="9.99"></Input>,
            <Spacer/>,
            <Input ref={pzjprice} label="UP-Price" type="number" min="1" max="30" className="no-hover" clearable labelRight="$" width="200px" disabled={upload} style={{textAlign: "center"}} placeholder="20"></Input>]
            :
            [<Input ref={pzprice} label="Price" type="number" min="1" max="200" className="no-hover" clearable labelRight="$" width="200px" style={{textAlign: "center"}} disabled={!isupdating || upload} initialValue={pizza.price}></Input>,
            <Spacer/>,
            <Input ref={pzjprice} label="UP-Price" type="number" min="1" max="30" className="no-hover" clearable labelRight="$" width="200px" style={{textAlign: "center"}} disabled={!isupdating || upload} initialValue={pizza.jprice}></Input>]}
            </Text>
            <div className="align-center">
            {(pizza.description === '') ? <Textarea ref={pzdesc} width="200px" disabled={upload} placeholder="Please enter a description." />
            :
            <Textarea ref={pzdesc} width="200px"  disabled={!isupdating || upload} initialValue={pizza.description} />
            }
            </div>
            {(pizza.photo === '') ? 
            <>
            <Image id="preview-img" src={(pizza.photo.includes('blob')) ? pizza.photo : `../pizza1.png`} width={160} height={160}/>
            <Spacer/>
            {upload ? <Loading size="large" color="black">Uploading</Loading> :
            <div className="align-center">
            <input ref={pzphoto} accept="image/x-png,image/gif,image/jpeg" onChange={(e) => loadImageHandler(e)} style={{width: '50%'}} type="file" />
            </div>
            }
            </>
            :
            (isupdating) ?
            upload ? // if uploading image
            [<Image id="preview-img" src={(pizza.photo !== null ) ? pizza.photo : `../pizza1.png`}  width={160} height={160}/>,
            <Loading size="large" color="black">Uploading</Loading>]
            :
            [<Image id="preview-img" src={(pizza.photo !== null ) ? pizza.photo : `../pizza1.png`}  width={160} height={160}/>,
            <div className="align-center">,
            <input ref={pzphoto} accept="image/x-png,image/gif,image/jpeg" onChange={(e) => loadImageHandler(e)} style={{width: '50%'}} type="file" />,
            </div>]
            :
            [<Image id="preview-img" src={(pizza.photo !== null ) ? pizza.photo : `../pizza1.png`}  width={160} height={160}/>,
            <Spacer/>]
            }
        </Modal.Content>
        <Checkbox.Group className="align-center" size="large" disabled={upload || pizza.name !== '' && !isupdating } onChange={sizeHandler} value={pizza.size}>
        <Checkbox value="M">M</Checkbox>
        <Checkbox value="XL">XL</Checkbox>
        <Checkbox value="XXL">XXL</Checkbox>
        <Checkbox value="55CM">55CM</Checkbox>
        </Checkbox.Group>
        <Spacer/>
        {upload ? 
        <Modal.Action className="loading-fix">
            <Loading size="large" color="black">Uploading</Loading>
        </Modal.Action>
        : // not uploading
        (pizza.name === '') ? // checking if new pizza
        [<Modal.Action passive onClick={() => setState(false)}>Cancel</Modal.Action>,
        <Modal.Action>{<Toggle onChange={(e) => toggleHandler(e)}  initialChecked={pizza.status}/>}</Modal.Action>,
        <Modal.Action passive onClick={() => postPizza(false)}>Submit</Modal.Action>]
        :
        isupdating ? 
        [<Modal.Action passive onClick={() => setState(false)}>Cancel</Modal.Action>,
        <Modal.Action>{<Toggle onChange={(e) => toggleHandler(e)}  initialChecked={pizza.status}/>}</Modal.Action>,
        <Modal.Action passive onClick={() => postPizza(true)}>Submit</Modal.Action>]
        :
        [<Modal.Action passive onClick={() => setUpdate(true)}>Update</Modal.Action>,
        <Modal.Action passive onClick={removeHandler}>Remove</Modal.Action>
        ]
        }
        </Modal>
        </>
      )
}

export default Products;
export const getStaticProps = async () => {
    // Get external data from the file system, API, DB, etc.
    const data = await apigetProduct();
    const unseralized = [];
    await data.data.data.forEach(i => unseralized.push(i.attributes)); // please fix in the future it hurts my eyes jesus fast api what a mess
    return {
      props: {data: unseralized,code: data.code}
    }
  }