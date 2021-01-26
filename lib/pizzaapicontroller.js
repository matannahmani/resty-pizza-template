import {unSeralizer,axios} from './libhelpers';

const apipostProduct = async (props) => 
    await axios.post(`${process.env.API_URL}/shops/${process.env.SHOP_ID}/products`, {product: props})
      .then((response) =>{
          return {
              code: 200,
              data: response.data
          }
      })
      .catch((error) => {
      });
const apipatchProduct = async (props) =>
    await axios.patch(`${process.env.API_URL}/shops/${process.env.SHOP_ID}/products/${props.id}`, {product: (({ id,product, ...o }) => o)(props)})
        .then((response) => {
          console.log(response);
            return {
                code: 200,
            }
        })
      .catch(function (error) {
      });
const apideleteProduct = (props) => {
    axios.delete(`${process.env.API_URL}/shops/${process.env.SHOP_ID}/products/${props.id}`)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
      });
}
const apigetProduct = async () =>
await axios.get(`${process.env.API_URL}/shops/${process.env.SHOP_ID}/products`)
    .then(res => (
        unSeralizer(res.data)
    ))
    .catch(() => ({
        code: 500,
        data: null,
        }),
    );

export {apipostProduct,apigetProduct,apipatchProduct,apideleteProduct};