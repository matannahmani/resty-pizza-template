import {Button,Grid} from '@geist-ui/react';
import React from 'react';
import { ShopContext } from '../components/contextprovider';
import {RiTakeawayFill,RiRestaurantFill,RiArrowLeftSLine} from 'react-icons/ri';

const Deliverymethod = (props) =>{
    const [shop] = React.useContext(ShopContext);

    const foward = (t) => {
        window.history.replaceState(null, null, `?takeaway=${t}`);
        props.setDelivery({stage: true, takeaway: t})
    }
    return (
        <>
        <RiArrowLeftSLine className="returnarrow" style={{position: 'absolute'}} onClick={() => {props.paid(false);props.setDelivery({stage: false,takeaway: false})}}/>
        <Grid.Container alignItems="center" justify="space-around" style={{height: "300px"}} direction="column">
        {shop.delivery && <Button icon={<RiRestaurantFill/>} shadow type="success-light" onClick={() => foward(true)}>משלוח</Button>}
        {shop.takeaway && <Button icon={<RiTakeawayFill/>} shadow type="error-light" onClick={() => foward(false)}>בא לקחת</Button>}
        </Grid.Container>
        </>
    )
}
export default Deliverymethod;