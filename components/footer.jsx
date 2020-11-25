import {FaHamburger,FaPizzaSlice} from 'react-icons/fa'
export default () => {
    return (
        <footer>
        <div className="footer-nav">
        <FaHamburger/>
        <span>Marchi Burger</span>
        </div>
        <div className="footer-nav">
        <FaPizzaSlice/>
        <span>Pepperoni Pizza</span>
        </div>
        </footer>
    )
}