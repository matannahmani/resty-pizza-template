import {FaPizzaSlice} from 'react-icons/fa';
import {useState,useEffect} from 'react';
const pizzaspinner = (props) => {
    return (
        <div style={{display: 'flex',flexDirection: 'column',alignItems: 'center',justifyContent: 'center'}}>
        <FaPizzaSlice className="pizza-spinner"/>
        <p>{props.text}</p>
        </div>
    )
}
export default pizzaspinner;