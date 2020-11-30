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
        const name = document.getElementById('form-name');
        const address = document.getElementById('form-address');
        const phone = document.getElementById('form-phone');
        const regex = /^\+?(972\-?)?0?(([23489]{1}\-?\d{7})|[5]{1}\d{1}\-?\d{7})$/
        if (name.value.length > 3 && address.value.length > 3 && phone.value.length > 3 ){
            if (phone.value.match(regex)){
                setModal(true);
                setVerify({...verify,loading: true});
            }else{
            setToast({type: 'error', text: 'Please enter vaild phone: EX: 0541234567'});
            }
        }else{
            setToast({type: 'error', text: 'Please enter vaild information'});
        }

        // setUser({user: {
        //     address:
        // }})
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
            <TextField id="form-name" className="label-shrink" label="Full Name" />
        </Grid>
        <Spacer/>
        <Grid>
        <TextField id="form-address" className="label-shrink" label="Address" />
        </Grid>
        <Spacer/>
        <Grid>
        <TextField id="form-phone" className="label-shrink" label="Phone" />
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