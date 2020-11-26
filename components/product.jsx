import {useToasts} from "@geist-ui/react";
import React,{useState,useEffect} from 'react';
import { CartContext } from "./contextprovider";

export default (props) =>{
  const [cart,setCart] = React.useContext(CartContext);
  const [pizza,setPizza] = useState(props.pizza)
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

  useEffect(() => {
    setPizza(props.pizza);
  }, [props])

  const addCartToggle = () => {
    if (cart.cart.some((e) => {
      if (e.size === pizza.size && pizza.id === e.id){
      e.amount += pizza.amount;
      return true
    }})){
    }else{
      const updatecart = [...cart.cart]
      updatecart.push(pizza)
      setCart({...cart, cart: updatecart});
    }
    setTimeout(() => {
      setToast({text: `${pizza.amount} ${pizza.name} ${pizza.size} added to cart`,type:"success"})
    }, 300);
  }
  
  return (
    <>
    <div className="pizza-box">
      <h1 className="name">{pizza.name}</h1>
      <span className="price">{pizza.price}$</span>
      <span className="description">{pizza.description}</span>
      <div className="pizza-size">
        <span onClick={() => setPizza({...pizza, size: 'L'})} className="option">L</span>
        <span onClick={() => setPizza({...pizza, size: 'XL'})}  className="option">XL</span>
        <span onClick={() => setPizza({...pizza, size: 'XXL'})}  className="option">XXL</span>
      </div>
      <div className="addcart">
        <div className="cartoption">
          <button onClick={() => {setPizza({size: pizza.amount++,...pizza});    console.log(cart);}}>+</button>
          <span>{pizza.amount}</span>
          <button onClick={() => (pizza.amount > 1) ? setPizza({size: pizza.amount--,...pizza}) : setToast({text: 'Cannot remove more',type: "warning"})}>-</button>
        </div>
        <button onClick={() => addCartToggle()} className="cartoption addcartbtn">Add to Cart</button>
      </div>
    </div>
    </>
    )
}