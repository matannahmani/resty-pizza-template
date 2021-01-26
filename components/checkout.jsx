import {Button,Spacer, Modal, useToasts, Grid} from '@geist-ui/react';
import React,{ useEffect, useState } from 'react';
import { UserContext,CartContext,ShopContext } from '../components/contextprovider';
import {MdPhonelinkLock} from 'react-icons/md';
import {RiArrowLeftSLine} from 'react-icons/ri'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {apipostOrder} from '../lib/orderapicontroller';
import PizzaSpinner from '../components/pizzaspinner';

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
    const [shop,setShop] = React.useContext(ShopContext);
    const [verify,setVerify] = useState({loading: false, phone: false});
    const [modal, setModal] = useState(false)
    const [user,setUser] = React.useContext(UserContext);
    const [cart,] = React.useContext(CartContext);
    const [, setToast] = useToasts()
    const name = React.createRef();
    const address = React.createRef();
    const phone = React.createRef();
    const inputarray = [name,address,phone];
    const [counter, setCounter] = useState(119);
    const [paying,setPaying] = useState(false)

    const closeHandler = (event) => {
      setModal(false)
      setVerify({...verify,loading:false});
    }

    const openHandler = () => {
        setCounter(119);
    }

    const secondsToHms = (d) => {
        d = Number(d);
        let h = Math.floor(d / 3600);
        let m = Math.floor(d % 3600 / 60);
        let s = Math.floor(d % 3600 % 60);
        let mDisplay = m > 0 ? "דקה ו" : ""
        let sDisplay = s > 0 ? s + (s == 1 ? " שניה" : " שניות") : "";
        return "נשאר " + mDisplay + sDisplay; 
    }

    useEffect(() => { // countdown
        const timer =
        counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
      }, [counter]);

    const verifyHandler = async () => {
        const regex = /^\+?(972\-?)?0?(([23489]{1}\-?\d{7})|[5]{1}\d{1}\-?\d{7})$/
        if (name.current.value.length > 3 && address.current.value.length > 3 && phone.current.value.length > 3 ){
            if (phone.current.value.match(regex)){
                const currentuser = {address: address.current.value,name: name.current.value,phone: phone.current.value};
                const currentcart = cart.cart.map( (e) => ({id: e.id,size: e.choosensize,amount: e.amount}) )
                // setVerify({...verify,loading: true});
                // setModal(true);
                // if verify then set user state
                // props.delivery == true = delivery | props.delivery = false == takeaway
                setShop({...shop,loading: true})
                const shopresult = await props.checkshop();
                if (shopresult.open && props.delivery && shopresult.delivery || shopresult.open && !props.delivery && shopresult.takeaway  ){
                    const result = await apipostOrder({...currentuser,order_products: [...currentcart],coupon: props.discount.code,takeaway: props.delivery});
                    if (result.data.status === 200){
                        setPaying(true);
                        alert('username: meshulam\n password: meshulam\n card :4580111111111121')
                        window.open(result.data.data.data.attributes.url);
                    }
                    else{
                        setToast({type: 'error',text: 'האופציה שבחרת אינה זמינה כעת אנא נסה שנית'})
                    }
                }else{
                    setToast({type: 'error',text: 'האופציה שבחרת אינה זמינה כעת אנא נסה שנית'})
                }
                setUser({...user,...currentuser})
                setShop({...shopresult,loading: false})
                localStorage.setItem('user', JSON.stringify(currentuser));
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

    useEffect(() => { // loads save user if exists and fill
        const saveduser = JSON.parse(localStorage.getItem('user'));
        if (saveduser !== null && saveduser.name !== undefined && saveduser.name !== null)
        {
            name.current.value = saveduser.name;
            address.current.value = saveduser.address;
            phone.current.value  = saveduser.phone;
        }else if (user.phone !== null && user.phone !== undefined){ // incase user cleans active storage while being on site
            name.current.value = user.name;
            address.current.value = user.address;
            phone.current.value  = user.phone;
        }
    }, [])

    return (
        <>
        <RiArrowLeftSLine className="returnarrow" style={{position: 'absolute'}} onClick={() => {props.paid(true);props.setDelivery({stage: false,takeaway: false})}}/>
        <Grid.Container alignItems={"center"} justify={"center"} direction={"column"}>
        <Grid>
        <h3 style={{textAlign: "center",color: "#FAFAFA"}}>פרטי לקוח</h3>
        </Grid>
        <Spacer/>
        {!paying ?
        <>
        <form id="order-form" className={classes.root} noValidate autoComplete="off">
        <Grid>
            <TextField inputRef={name} id="form-name" autoComplete="on" name="name" className="label-shrink cart-text-white" label="שם מלא" />
        </Grid>
        <Spacer/>
        <Grid>
        <TextField inputRef={address}id="form-address" autoComplete="on" name="address" className="label-shrink cart-text-white" label={props.delivery ? 'כתובת משלוח' : 'כתובת לקוח'} />
        </Grid>
        <Spacer/>
        <Grid>
        <TextField inputRef={phone} id="form-phone" autoComplete="tel" name="phone" type="tel" className="label-shrink cart-text-white" label="טלפון" />
        </Grid>
        <Spacer/>
        </form>
        <Grid.Container justify="flex-end" style={{paddingTop: '16px'}} alignItems="center">
            <Grid>
                {verify.loading ?
                <>
                <Button  loading ghost size={"small"} shadow icon={<MdPhonelinkLock/>}>אימות</Button>
                </>
                :
                <Button  onClick={() => verifyHandler()} ghost size={"small"} shadow icon={<MdPhonelinkLock/>}>אימות</Button>
                }
            </Grid>
        </Grid.Container>
        </>
        :
        <>
        <PizzaSpinner text="מחכה לתשלום"/>
        </>
        }
        </Grid.Container>
        <div> {/* Phone Verification */}
        <Modal onOpen={openHandler} open={modal} onClose={closeHandler}>
        <Modal.Title>אימות טלפוני</Modal.Title>
        <Modal.Subtitle>{secondsToHms(counter)}</Modal.Subtitle>
        <Modal.Content style={{textAlign: 'center'}}>
        <TextField id="standard-basic" className="label-shrink black" label="קוד" />
        </Modal.Content>
        <Modal.Action passive onClick={() => setModal(false)}>חזור</Modal.Action>
        <Modal.Action>הגש אימות</Modal.Action>
      </Modal>
      </div>
        </>
    )
}
export default Checkout;