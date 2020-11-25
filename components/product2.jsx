import {Image,Card,Divider,Text,Button} from "@geist-ui/react";
import {FaCartPlus,FaPizzaSlice} from 'react-icons/fa';
import React,{useState,useEffect} from 'react';
import { CartContext } from "./contextprovider";
export default (props) =>{
  const [loading, setloading] = useState(false);
  const [cart,setCart] = React.useContext(CartContext);
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
        <Card shadow width="360px" className="align-center">
        <Card.Content className="product-head">
          <Text b>Pepperoni Pizza</Text>
          {loading ? <FaPizzaSlice className="pizza-spinner"/>: <FaCartPlus onClick={() => addCartToggle()} className="product-add"/>}
        </Card.Content>
        <Divider y={0} />
        <Card.Content>
        <div className="product-image">
            <Image width={360} height={360} src="https://pepperonipizza.co.il/wp-content/uploads/2018/08/IMG_0353.jpg"/>
            <Text b size="16px" className="product-price">20$</Text>
        </div>
          <Text>
              Sweet pizza with great taste
          </Text>
          {loading ? <Button className="btn-addcart" size="small" shadow loading type="error"/> : <Button className="btn-addcart" key={props.id} onClick={() => addCartToggle()} size="small" shadow type="error">Add to Cart &nbsp;&nbsp;<FaCartPlus/></Button>}
        </Card.Content>
      </Card>
    )
}