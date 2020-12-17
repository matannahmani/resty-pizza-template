import {useToasts} from "@geist-ui/react";
import React,{useState,useEffect} from 'react';
import { CartContext } from "./contextprovider";

export default (props) =>{
  const [cart,setCart] = React.useContext(CartContext);
  const [pizza,setPizza] = useState({...props.pizza,choosensize: props.pizza.size[0]});
  const [, setToast] = useToasts();
  useEffect(() => {
    setPizza({...props.pizza,choosensize: props.pizza.size[0]});
  }, [props])
  useEffect(() => {
    const pizzasize = document.querySelectorAll('.pizza-size span');
    pizzasize.forEach((el) => {
      if (el.id !== pizza.choosensize)
        el.classList.remove('active');
      else
        el.classList.add('active');
    })
  }, [pizza.choosensize])

  const addCartToggle = () => {
    const updatecart = [...cart.cart]
    let rowindex;
    if (cart.cart.some((e,index) => {
      if (e.choosensize === pizza.choosensize && pizza.id === e.id){
        rowindex = index;
        return true;
      }})){
      updatecart[rowindex].amount += pizza.amount;
    }
    else
      updatecart.push(pizza)
    setCart({...cart, cart: updatecart});
    setTimeout(() => {
      setToast({text: `${pizza.amount} ${pizza.name} ${pizza.choosensize} added to cart`,type:"success"})
    }, 300);
  }
  const sizeHandler = (e) => {
    const index = pizza.size.findIndex(item => item === e)
    setPizza({...pizza, key: `${e.id}${e.choosensize}`, choosensize: e,price: (props.pizza.price + (pizza.jprice * index))});
  }
  return (
    <>
    <div className="pizza-box">
      <h1 className="name">{pizza.name}</h1>
      <span className="price">{pizza.price}$</span>
      <span className="description">{pizza.description}</span>
      <div className="pizza-size">
      {pizza.size.map(e =>{
          return (<span id={e} onClick={() => sizeHandler(e)} className="option">{e}</span>)
        })}
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
    </>
    )
}