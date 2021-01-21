import React from 'react';
import {RiShoppingCartLine,RiArrowLeftSLine} from 'react-icons/ri'
import { CartContext } from './contextprovider';
import { useRouter } from 'next/router'
import Link from 'next/link'
const Navbar = () => {
    const [cart,setCart] = React.useContext(CartContext);
    const Router = useRouter();
    return (
        <header className="navbar">
            {(Router.pathname !== '/') ?
            <div className="returnnav" style={{cursor: 'pointer'}} onClick={() => (Router.pathname !== '/') ? Router.back() : null}>
            <RiArrowLeftSLine className="returnarrow"/>
            </div>
            : 
            <div className="returnarrow" style={{padding: '14px'}}></div> // empty div to push cart to flex end
            }
            <Link href="/">
            <img style={{cursor: 'pointer'}} src="../logo.png" className="nav-logo" alt=""/>
            </Link>
            <div className="cartnav" style={{cursor: 'pointer'}} onClick={() => Router.push('/cart')}>
                <RiShoppingCartLine className="cartbox"/>
                <span style={{color: "white",pointerEvents: 'none'}}>{cart.cart.length}</span>
            </div>
        </header>
      );
}
export default Navbar;