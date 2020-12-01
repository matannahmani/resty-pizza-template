import {Input,Button,Spacer, Modal, useToasts,Image, Grid, Card} from '@geist-ui/react';
import React,{ useEffect, useState } from 'react';
import { UserContext } from '../components/contextprovider';
import {MdPhonelinkLock} from 'react-icons/md';
import {RiArrowLeftSLine} from 'react-icons/ri'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
        color: 'white',
      },
    },
  }));
const Checkout = (props) => {
    const classes = useStyles();
    const [verify,setVerify] = useState({loading: false, phone: false});
    const [modal, setModal] = useState(false)
    const [user,setUser] = React.useContext(UserContext);
    const [, setToast] = useToasts()
    const name = React.createRef();
    const address = React.createRef();
    const phone = React.createRef();
    const inputarray = [name,address,phone];
    let timer = 0;
    const closeHandler = (event) => {
      setModal(false)
      setVerify({...verify,loading:false});
    }
    const openHandler = () => {
        // let timer = 0;
        setInterval(() => {
            timer += 1000;
        }, 1000);
    }
    const verifyHandler = () => {
        const regex = /^\+?(972\-?)?0?(([23489]{1}\-?\d{7})|[5]{1}\d{1}\-?\d{7})$/
        if (name.current.value.length > 3 && address.current.value.length > 3 && phone.current.value.length > 3 ){
            if (phone.current.value.match(regex)){
                setModal(true);
                setVerify({...verify,loading: true});
            }else{
            setToast({type: 'error', text: 'Please enter vaild phone: EX: 0541234567'});
            phone.current.parentElement.classList.add('error')
            }
        }else{
            setToast({type: 'error', text: 'Please enter vaild information'});
            inputarray.forEach( e => {
                if (e.current.value.length < 3)
                e.current.parentElement.classList.add('error');
            })
        }
    }

    return (
        <>
        <RiArrowLeftSLine className="returnarrow" style={{position: 'absolute'}} onClick={() => props.paid(false)}/>
        <Grid.Container alignItems={"center"} justify={"center"} direction={"column"}>
        <Grid>
        <h3 style={{textAlign: "center",color: "#FAFAFA"}}>Delivery Address</h3>
        </Grid>
        <Spacer/>
        <form id="order-form" className={classes.root} noValidate autoComplete="off">
        <Grid>
            <TextField inputRef={name} id="form-name" className="label-shrink cart-text-white" label="Full Name" />
        </Grid>
        <Spacer/>
        <Grid>
        <TextField inputRef={address}id="form-address" className="label-shrink cart-text-white" label="Address" />
        </Grid>
        <Spacer/>
        <Grid>
        <TextField inputRef={phone} id="form-phone" className="label-shrink cart-text-white" label="Phone" />
        </Grid>
        <Spacer/>
        </form>
        <Grid.Container justify="flex-end" style={{paddingTop: '16px'}} alignItems="center">
            <Grid>
                {verify.loading ?
                <>
                <Button  loading ghost size={"small"} shadow icon={<MdPhonelinkLock/>}>Verify</Button>
                </>
                :
                <Button  onClick={() => verifyHandler()} ghost size={"small"} shadow icon={<MdPhonelinkLock/>}>Verify</Button>
                }
            </Grid>
        </Grid.Container>
        </Grid.Container>
        <div> {/* Phone Verification */}
        <Modal onOpen={openHandler} open={modal} onClose={closeHandler}>
        <Modal.Title>Phone Verification</Modal.Title>
        <Modal.Subtitle>{timer}</Modal.Subtitle>
        <Modal.Content style={{textAlign: 'center'}}>
        <TextField id="standard-basic" className="label-shrink black" label="Code" />
        </Modal.Content>
        <Modal.Action passive onClick={() => setModal(false)}>Cancel</Modal.Action>
        <Modal.Action>Submit</Modal.Action>
      </Modal>
      </div>
        </>
    )
}
export default Checkout;