import {Image,Card,Divider,Text,Button} from "@geist-ui/react";
import {FaCartPlus} from 'react-icons/fa'
export default () =>{
    return (
        <Card shadow width="360px" className="align-center">
        <Card.Content className="product-head">
          <Text b>Pepperoni Pizza</Text>
          <FaCartPlus className="product-add"/>
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
          <Button iconRight={<FaCartPlus/>}className="btn-addcart" shadow type="error">Add to Cart</Button>
        </Card.Content>
      </Card>
    )
}