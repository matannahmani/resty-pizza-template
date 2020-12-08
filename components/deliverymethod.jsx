import {Button,Grid} from '@geist-ui/react';
import {RiTakeawayFill,RiRestaurantFill,RiArrowLeftSLine} from 'react-icons/ri';
const Deliverymethod = (props) =>{
    return (
        <>
        <RiArrowLeftSLine className="returnarrow" style={{position: 'absolute'}} onClick={() => {props.paid(false);props.setDelivery({stage: false,takeaway: false})}}/>
        <Grid.Container alignItems="center" justify="space-around" style={{height: "300px"}} direction="column">
        <Button icon={<RiRestaurantFill/>} shadow type="success-light" onClick={() => props.setDelivery({stage: true, takeaway: true})}>Takeaway</Button>
        <Button icon={<RiTakeawayFill/>} shadow type="error-light" onClick={() => props.setDelivery({stage: true, takeaway: false})}>Home Delivery</Button>
        </Grid.Container>
        </>
    )
}
export default Deliverymethod;