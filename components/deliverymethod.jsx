import {Button,Grid,Note} from '@geist-ui/react';
import React from 'react';
import { ShopContext } from '../components/contextprovider';
import {RiTakeawayFill,RiRestaurantFill,RiArrowLeftSLine} from 'react-icons/ri';

const Deliverymethod = (props) =>{
    const [shop] = React.useContext(ShopContext);

    const foward = (t) => {
        window.history.replaceState(null, null, `?takeaway=${t}`);
        props.setDelivery({stage: true, takeaway: t})
    }

    const msg = () => {
        if (shop.takeaway && shop.delivery)
            return {text: ' משלוח ואיסוף זמין', type: 'success'}
        else if (!shop.takeaway && shop.delivery)
            return {text: ' רק משלוחים זמנים', type: 'warning'}
        else if (shop.takeaway && !shop.delivery)
            return {text: ' רק איסופים זמנים', type: 'warning'}
        else
            return {text: ' כרגע אין אופצית רכישה', type: 'error'}
    }

    return (
        <>
        <RiArrowLeftSLine className="returnarrow" style={{position: 'absolute'}} onClick={() => {props.paid(false);props.setDelivery({stage: false,takeaway: false})}}/>
        <Grid.Container alignItems="center" justify="space-around" style={{height: "300px"}} direction="column">
        <Note type={msg().type} filled label="סטטוס">{msg().text}</Note>
        <Button icon={<RiRestaurantFill/>} disabled={!shop.delivery} shadow type="success-light" onClick={() => foward(true)}>משלוח</Button>
        <Button icon={<RiTakeawayFill/>} disabled={!shop.takeaway} shadow type="error-light" onClick={() => foward(false)}>בא לקחת</Button>

        </Grid.Container>
        </>
    )
}
export default Deliverymethod;