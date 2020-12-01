import React,{useState,useEffect} from 'react';
import {RiShoppingCartLine,RiArrowLeftSLine} from 'react-icons/ri'
import { CartContext } from './contextprovider';
import { useRouter } from 'next/router'
const Navbar = () => {
    const [cart,setCart] = React.useContext(CartContext);
    const Router = useRouter();
    return (
        <div className="navbar">
            <div className="returnnav" style={{cursor: 'pointer'}} onClick={() => Router.back()}>
                <RiArrowLeftSLine className="returnarrow"/>
            </div>
            {/* <h1>Pepperoni Pizza</h1> */}
            <div className="cartnav" style={{cursor: 'pointer'}} onClick={() => Router.push('/cart')}>
                <RiShoppingCartLine className="cartbox"/>
                <span style={{color: "white"}}>{cart.cart.length}</span>
            </div>
        </div>
      );
}
export default Navbar;