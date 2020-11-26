import React,{useState,useEffect} from 'react';
import {RiShoppingCartLine,RiArrowLeftSLine} from 'react-icons/ri'
import { CartContext } from './contextprovider';
import { useRouter } from 'next/router'
import Link from 'next/link'

const Navbar = () => {
    const [cart,setCart] = React.useContext(CartContext);
    const Router = useRouter();
    return (
        <div className="navbar">
            <RiArrowLeftSLine onClick={() => Router.back()} className="returnarrow"/>
            <h1>Pepperoni Pizza</h1>
            <div className="cartnav">
            <Link href="cart">
                <RiShoppingCartLine onClick={console.log(cart)} className="cartbox"/>
            </Link>
            <span style={{color: "white"}}>{cart.cart.length}</span>
            </div>
        </div>
      );
}
export default Navbar;