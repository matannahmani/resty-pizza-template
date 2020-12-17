import {FaPizzaSlice} from 'react-icons/fa';
import {useState,useEffect} from 'react';
const pizzaspinner = () => {
    return (
        <>
        <FaPizzaSlice className="pizza-spinner"/>
        <p>Loading</p>
        </>
    )
}
export default pizzaspinner;