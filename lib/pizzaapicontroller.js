import axios from 'axios';
const apipostProduct = async (props) => 
    await axios.post('http://localhost:3000/products', {product: props})
      .then((response) =>{
          return {
              code: 200,
              data: response.data
          }
      })
      .catch((error) => {
        console.log(error);
      });
const apipatchProduct = async (props) =>
    await axios.patch(`http://localhost:3000/products/${props.id}`, {product: (({ id, ...o }) => o)(props)})
        .then((response) =>{
            return {
                code: 200,
                data: response.data
            }
        })
      .catch(function (error) {
        console.log(error);
      });
const apideleteProduct = (props) => {
    axios.delete(`http://localhost:3000/products/${props.id}`)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}
const apigetProduct = async () =>
await axios.get('http://localhost:3000/products')
    .then(res => ({
        code: 200,
        data: res.data,
    }))
    .catch(() => ({
        code: 500,
        data: null,
        }),
    );

export {apipostProduct,apigetProduct,apipatchProduct,apideleteProduct};