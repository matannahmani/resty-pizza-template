import {useToasts} from "@geist-ui/react";
import React,{useState,useEffect} from 'react';
import { CartContext } from "./contextprovider";

const Product = (props) =>{
  const [cart,setCart] = React.useContext(CartContext);
  const [pizza,setPizza] = useState({amount: 1});
  const [, setToast] = useToasts();

  useEffect(() => {
    if (props.pizza.size !== undefined)
      setPizza({...props.pizza,amount: 1, choosensize: props.pizza.size[0]});
  }, [props])
  useEffect(() => {
    const pizzasize = document.querySelectorAll('.pizza-size span');
    if (props.pizza.size !== undefined) {
      pizzasize.forEach((el) => {
        if (el.id !== pizza.choosensize)
          el.classList.remove('active');
        else
          el.classList.add('active');
      })
    }
  }, [pizza.choosensize])

  const addCartToggle = () => {
    if (props.pizza.name === undefined){
      return setToast({text: "דמו פיצה נוספה..",type:"success"})
    }
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
      <h1 className="name">{pizza.name !== undefined ? pizza.name : 'שם הפיצה' }</h1>
      <span className="price">{pizza.price !== undefined ? pizza.price : '50' }₪</span>
      <span className="description">{pizza.description !== undefined ? pizza.description : 'כאן יופיע הסבר' }</span>
      <div className="pizza-size">
      { Array.isArray(pizza.size) ?
        pizza.size.map(e =>{
        return (<span key={`S-${e}`} id={e} onClick={() => sizeHandler(e)} className="option">{e}</span>)
        }) 
      :
        (<span key="sample" id="sample-size" style={{cursor: "not-allowed",pointerEvents: 'none'}} className="option active">S</span>)
      }
      </div>
      <div className="addcart">
        <div className="cartoption">
          <button onClick={() => setPizza({size: pizza.amount++,...pizza})}>+</button>
          <span>{pizza.amount}</span>
          <button onClick={() => (pizza.amount > 1) ? setPizza({size: pizza.amount--,...pizza}) : setToast({text: 'Cannot remove more',type: "warning"})}>-</button>
        </div>
        <button onClick={() => addCartToggle()} className="cartoption addcartbtn">הוסף לעגלה</button>
      </div>
    </div>
    </>
    )
}
export default Product;