import axios from 'axios';
const apipostOrder = async (props) => 
    await axios.post('http://localhost:3000/orders', {order: props})
      .then((response) =>{
          return {
              code: 200,
              data: response.data
          }
      })
      .catch((error) => {
        console.log(error);
      });
const apipatchOrder = (props) => {
    axios.patch(`http://localhost:3000/orders/${props.id}`, {order: {status: props.status}})
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}
const apideleteOrder = (props) => {
    axios.delete(`http://localhost:3000/orders/${props.id}`)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}
const apigetOrder = async () =>
await axios.get('http://localhost:3000/orders')
    .then(res => ({
        code: 200,
        data: res.data,
    }))
    .catch(() => ({
        code: 500,
        data: null,
        }),
    );
const apicheckOrder = async (props) =>
await axios.get('http://localhost:3000/ordercheck', {
  params: {
    'order[code]': props.code }
  })
    .then(res => ({
        code: 200,
        data: res.data.data.attributes,
    }))
    .catch(() => ({
        code: 500,
        data: null,
        }),
    );
export {apipostOrder,apigetOrder,apipatchOrder,apideleteOrder,apicheckOrder};