import axios from 'axios';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = `${process.env.API_URL}`;
axios.defaults.headers.common['Access-Control-Allow-Methods'] = "DELETE, POST, GET, PATCH";
axios.defaults.withCredentials = true;
const apipostOrder = async (props) => 
    await axios.post(`${process.env.API_URL}/orders`, {order: props})
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
    axios.patch(`${process.env.API_URL}/orders/${props.id}`, {order: {status: props.status}})
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}
const apideleteOrder = (props) => {
    axios.delete(`${process.env.API_URL}/orders/${props.id}`)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}
const apigetOrder = async () =>
await axios.get(`${process.env.API_URL}/orders`)
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
await axios.get(`${process.env.API_URL}/ordercheck`, {
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
const apicheckCart = async (props) =>
await axios.get(`${process.env.API_URL}/checkcart`, {
  params: {
    'products': [...props] }
  })
    .then(res => ({
        code: 200,
        data: res.data,
    }))
    .catch(() => ({
        code: 500,
        data: null,
        }),
    );
export {apipostOrder,apigetOrder,apipatchOrder,apideleteOrder,apicheckOrder,apicheckCart};