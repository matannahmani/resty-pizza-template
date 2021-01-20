import {useState,useEffect} from 'react'
import {Grid,Card} from '@geist-ui/react';
import Pizzaspinner from '../components/pizzaspinner';
import {apiapprovedOrder} from '../lib/orderapicontroller';
const Paid = ({query}) => {
    const [status,setStatus] = useState({paid: false,loading: true,text: 'Loading'});
    useEffect( () => {
        console.log('i am fried once')
        if (query.id !== undefined){
            // const result = await apiapprovedOrder(parseInt(query.id));
        }else{
            // setStatus({...status,loading: false,text: 'Order not Found'})
        }

    },[])

    return (
        <Grid.Container justify="center" alignItems="center">
            <Grid xs={24} sm={18} md={12}>
            <Card type="violet" shadow>
            <Card.Body style={{padding: '16pt 0pt'}}>
                <Pizzaspinner text={status.text}/>
            </Card.Body>
            </Card>
            </Grid>
        </Grid.Container>
    )
}

Paid.getInitialProps = ({query}) => {
    return {query}
}
export default Paid;