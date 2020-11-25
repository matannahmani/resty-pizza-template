import React,{useState,useEffect} from 'react';
import {RiShoppingCartLine,RiArrowLeftSLine} from 'react-icons/ri'
import { CartContext } from './contextprovider';
const Navbar = () => {
    const [cart,setCart] = React.useContext(CartContext);
    return (
        <div className="navbar">
            <RiArrowLeftSLine className="returnarrow"/>
            <h1>Pepperoni Pizza</h1>
            <div className="cartnav">
            <RiShoppingCartLine className="cartbox"/>
            <span style={{color: "white"}}>{cart.cart.pizza.length}</span>
            </div>
        </div>
      );
}
export default Navbar;