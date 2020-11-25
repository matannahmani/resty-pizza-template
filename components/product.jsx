import {useToasts} from "@geist-ui/react";
import {FaCartPlus,FaPizzaSlice} from 'react-icons/fa';
import React,{useState,useEffect} from 'react';
import { CartContext } from "./contextprovider";
export default (props) =>{
  const [cart,setCart] = React.useContext(CartContext);
  const [pizza,setPizza] = useState({id: 0,name: 'Pepperoni',price: 9.20,description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores molestias veritatis quidem.',size: 'M',amount: 1})
  const [, setToast] = useToasts()
  useEffect(() => {
    const pizzasize = document.querySelectorAll('.pizza-size span');
    pizzasize.forEach((el) => {
      if (el.textContent !== pizza.size)
        el.classList.remove('active');
      else
        el.classList.add('active');
    })
  }, [pizza.size])
  const addCartToggle = () => {
    setloading(true);
    let newcart = cart['cart'];
    newcart['pizza'].push(props.id);
    setCart({oldcart: cart['cart'],cart: newcart})
    console.log(cart);
    setTimeout(() => {
      setloading(false);
    }, 1000);
  }
  return (
    <div className="pizza-box">
      <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M100 200C155.228 200 200 155.228 200 100C200 44.7715 155.228 0 100 0C44.7715 0 0 44.7715 0 100C0 155.228 44.7715 200 100 200Z" fill="#5D6292"/>
      </svg>
      <h1 className="name">{pizza.name}</h1>
      <span className="price">{pizza.price}$</span>
      <span className="description">{pizza.description}</span>
      <div className="pizza-size">
        <span onClick={() => setPizza({...pizza, size: 'S'})} className="option">S</span>
        <span onClick={() => setPizza({...pizza, size: 'M'})}  className="option">M</span>
        <span onClick={() => setPizza({...pizza, size: 'L'})}  className="option">L</span>
      </div>
      <div className="addcart">
        <div className="cartoption">
          <button onClick={() => setPizza({size: pizza.amount++,...pizza})}>+</button>
          <span>{pizza.amount}</span>
          <button onClick={() => (pizza.amount > 1) ? setPizza({size: pizza.amount--,...pizza}) : setToast({text: 'Cannot remove more',type: "warning"})}>-</button>
        </div>
        <button onClick={() => addCartToggle()} className="cartoption addcartbtn">Add to Cart</button>
      </div>
    </div>
    )
}