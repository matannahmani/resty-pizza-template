import {Grid,Image,Text} from '@geist-ui/react';

const Close = () => {
    return (
        <Grid.Container justify="center" alignItems="center">
            <Grid justify="center" alignItems="center">
                <Image className="logo-spinner" src="../logo.png" width={200} height={200}/>
                <Text style={{color: "white"}}>We are currently Closed!<br/>Please try again later.</Text>
            </Grid>
        </Grid.Container>
    )
}
export default Close;