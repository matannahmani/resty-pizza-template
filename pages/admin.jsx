import {Grid,Button,Card,Spacer,Input,Dot,useToasts} from '@geist-ui/react';
import React,{useState,useEffect,useContext} from 'react';
import { useRouter } from 'next/router';
const admin = () => {
    const username = React.createRef();
    const password = React.createRef();
    const [, setToast] = useToasts();
    const [loading,setLoading] = useState(false);
    const router = useRouter();
    const loginHandler = () =>{
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setToast({type: "success",text: "Logged in succesfully redirecting"});
            router.push('admin/dashboard')
        }, 500);
        
    }
    useEffect(() => {
        router.prefetch('dashboard', 'get');
    }, [])
    return (
        <Grid.Container gap={2} alignItems={"center"} justify={"center"}>
            <Grid xs={20} md={12} xl={12} >
            <Card shadow type={"lite"}>
            <Spacer/>
            <Input placeholder="Admin" width="240px">
            <Dot color="black" type="success">
                Username
            </Dot>
            </Input>
            <Spacer/>
            <Input.Password width="240px">
            <Dot color="black" type="success">
                Password
            </Dot>
            </Input.Password>
            <Spacer/>
            <Grid style={{textAlign: "center"}}>
                <Button loading={loading} shadow size="medium" auto onClick={loginHandler} type="secondary">Login</Button>
            </Grid>
            </Card>
            </Grid>
        </Grid.Container>
    )
}
export default admin;