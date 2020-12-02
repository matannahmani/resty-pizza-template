import {Grid,Button,Text,Card,Spacer,Input,Dot,useToasts} from '@geist-ui/react';
import Link from 'next/link'

const Dashboard = () => {
    return (
        <Grid.Container  alignItems="center" gap={4} direction="column">
            <Grid>
            <Text style={{color:"#FAFAFA"}} h1>Control Panel</Text>
            </Grid>
            <Grid>
                <Link href="orders">
                <Button shadow><Text b>Orders</Text></Button>
                </Link>
            </Grid>
            <Grid>
                <Link href="products">
                <Button shadow><Text b>Product List</Text></Button>
                </Link>
            </Grid>
            <Grid>
                <Link href="coupon">
                <Button shadow><Text b>Coupon List</Text></Button>
                </Link>
            </Grid>
            <Grid>
                <Button shadow><Text b>Close Delivery</Text></Button>
            </Grid>
            <Grid>
                <Button shadow><Text b>Close Shop</Text></Button>
            </Grid>
        </Grid.Container>
    )
}
export default Dashboard;