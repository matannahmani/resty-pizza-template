import {Grid,Button,Card,Spacer,Input,Dot,useToasts} from '@geist-ui/react';
import React,{useState,useEffect,useContext} from 'react';
import { useRouter } from 'next/router';
import {login} from '../lib/userapicontroller';
import { UserContext } from '../components/contextprovider';
const admin = () => {
    const username = React.createRef();
    const password = React.createRef();
    const [, setToast] = useToasts();
    const [loading,setLoading] = useState(false);
    const [user,setUser] = React.useContext(UserContext);
    const router = useRouter();
    const loginHandler = async () =>{
        setLoading(true);
        if (username !== null && password !== null)
            if (username.current.value.length > 4 && password.current.value.length > 4){
                const result = await login({email: username.current.value,password: password.current.value});
                console.log(result.status);
                if (result.status !== 401 && result.status.code === 200){
                    setUser({...user,...result.data});
                    localStorage.setItem('user', JSON.stringify(result.data));
                    setToast({type: "success",text: "Logged in succesfully redirecting"});
                    router.push('admin/dashboard')        
                }
                else{
                    setToast({type: "warning",text: "Email or password are wrong"});
                }
            }
            else{
                setToast({type: "warning",text: "Email or password length are short"});
            }
        setLoading(false);
    }
    useEffect(() => {
        if (user.adminlevel > 0){
            router.push('/admin/dashboard');
            setToast({type: "success",text: "Logged in succesfully redirecting"});
        }
    }, [])
    return (
        <Grid.Container gap={2} alignItems={"center"} justify={"center"}>
            <Grid xs={20} md={12} xl={12} >
            <Card shadow type={"lite"}>
            <Spacer/>
            <Input ref={username} name="email" autoComplete="on" placeholder="Admin" width="240px">
            <Dot color="black" type="success">
                Username
            </Dot>
            </Input>
            <Spacer/>
            <Input.Password ref={password} name="password" autoComplete="on" width="240px">
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