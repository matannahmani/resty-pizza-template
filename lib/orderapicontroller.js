import axios from 'axios';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = `${process.env.API_URL}`;
axios.defaults.headers.common['Access-Control-Allow-Methods'] = "DELETE, POST, GET, PATCH";
axios.defaults.xsrfCookieName = "CSRF-TOKEN";
axios.defaults.xsrfHeaderName = "X-CSRF-Token";
axios.defaults.withCredentials = true;


const apipostOrder = async (props) => 
    await axios.post(`${process.env.API_URL}/orders`, {order: props})
      .then(res => ({
        code: 200,
        data: res.data,
    }))
    .catch(() => ({
        code: 500,
        data: null,
        }),
    );
const apipatchOrder = async (props) => 
    await axios.patch(`${process.env.API_URL}/orders/${props.id}`, {order: {shipped: props.shipped, done: props.done}})
      .then(res => ({
        code: 200,
        data: res.data,
    }))
    .catch(() => ({
        code: 500,
        data: null,
        }),
    );

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
const apigetDailyOrders = async () =>
    await axios.get(`${process.env.API_URL}/dailyorders`)
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
const apiapprovedOrder = async (props) =>
await axios.get(`${process.env.API_URL}/orderstatus`, {
  params: {
    'id': props }
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
export {apipostOrder,apigetOrder,apipatchOrder,apicheckOrder,apicheckCart,apiapprovedOrder,apigetDailyOrders};
