import axios from 'axios';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = `${process.env.API_URL}`;
axios.defaults.headers.common['Access-Control-Allow-Methods'] = "DELETE, POST, GET, PATCH";
axios.defaults.xsrfCookieName = "CSRF-TOKEN";
axios.defaults.xsrfHeaderName = "X-CSRF-Token";
axios.defaults.withCredentials = true;


const apipostOrder = async (props) => 
    await axios.post(`${process.env.API_URL}/shops/${process.env.SHOP_ID}/orders`, {order: props})
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
    await axios.patch(`${process.env.API_URL}/shops/${process.env.SHOP_ID}/orders/${props.id}`, {order: {shipped: props.shipped, done: props.done}})
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
  await axios.get(`${process.env.API_URL}/shops/${process.env.SHOP_ID}/orders`)
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
    await axios.get(`${process.env.API_URL}/shops/${process.env.SHOP_ID}/dailyorders`)
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
await axios.get(`${process.env.API_URL}/shops/${process.env.SHOP_ID}/ordercheck`, {
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
await axios.get(`${process.env.API_URL}/shops/${process.env.SHOP_ID}/checkcart`, {
  params: {
    'products': [...props] }
  })
    .then(res => (
        res.data
    ))
    .catch(() => ({
        code: 500,
        data: null,
        }),
    );
const apiapprovedOrder = async (props) =>
await axios.get(`${process.env.API_URL}/shops/${process.env.SHOP_ID}/orderstatus`, {
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
