import {Input,Button,Spacer, Modal, useToasts,Image, Grid, Card} from '@geist-ui/react';
import React,{ useEffect, useState } from 'react';
import { CartContext } from '../components/contextprovider';
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
    const closeHandler = (event) => {
      setModal(false)
      setVerify({...verify,loading:false});
    }
    return (
        <>
        <RiArrowLeftSLine className="returnarrow" style={{position: 'absolute'}} onClick={() => props.paid(false)}/>
        <Grid.Container alignItems={"center"} justify={"center"} direction={"column"}>
        <Grid>
        <h3 style={{textAlign: "center",color: "#FAFAFA"}}>Delivery Address</h3>
        </Grid>
        <Spacer/>
        <form className={classes.root} noValidate autoComplete="off">
        <Grid>
            <TextField id="standard-basic" className="label-shrink" label="Full Name" />
        </Grid>
        <Spacer/>
        <Grid>
        <TextField id="standard-basic" className="label-shrink" label="Address" />
        </Grid>
        <Spacer/>
        <Grid>
        <TextField id="standard-basic" className="label-shrink" label="Phone" />
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
                <Button  onClick={() => {setModal(true);setVerify({...verify,loading: true})}} ghost size={"small"} shadow icon={<MdPhonelinkLock/>}>Verify</Button>
                }
            </Grid>
        </Grid.Container>
        </Grid.Container>
        <div> {/* Phone Verification */}
        <Modal open={modal} onClose={closeHandler}>
        <Modal.Title>Phone Verification</Modal.Title>
        <Modal.Subtitle>3:00</Modal.Subtitle>
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