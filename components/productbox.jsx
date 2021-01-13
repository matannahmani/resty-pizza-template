import Product from '../components/product';
import Flicking from "@egjs/react-flicking";
import {RiArrowLeftSLine} from 'react-icons/ri'
import React,{useEffect,useState} from 'react';
import {Image} from '@geist-ui/react';
const Productbox = (props) => {
    const [pizzalist,setpizzaList] = useState(props.data);
    const [pizzaindex,setIndex] = useState(0);
    const [loading,setLoading] = useState(true);
    const flicking = React.createRef(<Flicking/>);
    useEffect(() => {
        const showpz = props.data.data.filter((e) => e.status)
        const pizzals = showpz.map (e => {
            if (e.status){
                const pizza = {key: e.id,...e,amount: 1};
                return pizza 
            }
        });
        setpizzaList([...pizzals])
        setLoading(false);
    }, [])
    
    const moveHandler = (next) => {
        const flick = flicking.current;
        if (next)
            (flick.getIndex() === pizzalist.length -1) ? flick.moveTo(0,500) : flick.moveTo(flick.getIndex() + 1,500); // foward
        else
            (flick.getIndex() === 0) ? flick.moveTo(pizzalist.length - 1,500) : flick.moveTo(flick.getIndex() - 1,500); // backward
        }
    return (
        
        <>
        {loading ? 
        <div key="product-s" className="product-slider">
            LOADING
        </div>
        :
        <div key="product-s2" className="product-slider">
            <Flicking ref={flicking} onSelect = {(e) => {flicking.current.moveTo(e.index,500)}}  onChange = {(e) => setIndex(e.index)}   inputType = {["touch", "mouse"]} className="flicking flicking0"  autoResize = {true}
  adaptive = {true} gap={16} bound={true} anchor={'80px'} circular={true}>
                
                {pizzalist !== undefined ? 
                pizzalist.map((e) => 
                    {
                        if (e === undefined)
                            return null
                        else if (e.photo_url === null)
                            return(
                                <div key={e.id} className="panel">
                                <svg height="160" width="160">
                                <circle cx="80" cy="80" r="80" stroke="black" stroke-width="3" fill="red" />
                                </svg>
                                </div>
                            )
                        else
                        {
                            return(
                                <Image key={e.id} src={`${e.photo_url.split('upload/')[0]}upload/ar_1:1,c_fill,g_auto,r_max,h_160,w_160/${e.photo_url.split('upload/')[1]}`} width={160} height={160}/>
                            )
                        }
                })
                : console.log(false)}
            </Flicking>
            <div className="slider-indicators">
            <RiArrowLeftSLine onClick={() => moveHandler(false)} className="glow" />
            <RiArrowLeftSLine onClick={() => moveHandler(true)} className="right glow"/>
            </div>
            <Product pizza={{...pizzalist[pizzaindex]}}/>
        </div>
        }
        </>
    )
}
export default Productbox;