import {Button,Grid} from '@geist-ui/react';
import { useRouter } from 'next/router'
import {RiTakeawayFill,RiRestaurantFill,RiArrowLeftSLine} from 'react-icons/ri';
const Deliverymethod = (props) =>{
    const router = useRouter()

    const foward = (t) => {
        window.history.replaceState(null, null, `?takeaway=${t}`);
        props.setDelivery({stage: true, takeaway: t})
    }
    return (
        <>
        {console.log(props)}
        <RiArrowLeftSLine className="returnarrow" style={{position: 'absolute'}} onClick={() => {props.paid(false);props.setDelivery({stage: false,takeaway: false})}}/>
        <Grid.Container alignItems="center" justify="space-around" style={{height: "300px"}} direction="column">
        {props.shop.delivery && <Button icon={<RiRestaurantFill/>} shadow type="success-light" onClick={() => foward(true)}>משלוח</Button>}
        {props.shop.takeaway && <Button icon={<RiTakeawayFill/>} shadow type="error-light" onClick={() => foward(false)}>בא לקחת</Button>}
        </Grid.Container>
        </>
    )
}
export default Deliverymethod;