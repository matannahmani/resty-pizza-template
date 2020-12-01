import {Grid,Button,Card,Spacer,Input,Dot} from '@geist-ui/react';
import React,{useState,useEffect,useContext} from 'react';
const admin = () => {
    const username = React.createRef();
    const password = React.createRef();

    return (
        <Grid.Container gap={2} alignItems={"center"} justify={"center"}>
            <Grid xs={12} md={12} xl={12} >
            <Card shadow type={"lite"}>
            <Spacer/>
            <Input placeholder="Admin">
            <Dot color="black" type="success">
                Username
            </Dot>
            </Input>
            <Spacer/>
            <Input.Password>
            <Dot color="black" type="success">
                Password
            </Dot>
            </Input.Password>
            <Spacer/>
            <Grid style={{textAlign: "center"}}>
                <Button shadow type="secondary">Login</Button>
            </Grid>
            </Card>
            </Grid>
        </Grid.Container>
    )
}
export default admin;