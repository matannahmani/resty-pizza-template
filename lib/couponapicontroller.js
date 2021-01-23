import axios from 'axios';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = `${process.env.API_URL}`;
axios.defaults.headers.common['Access-Control-Allow-Methods'] = "DELETE, POST, GET, PATCH";
axios.defaults.xsrfCookieName = "CSRF-TOKEN";
axios.defaults.xsrfHeaderName = "X-CSRF-Token";
axios.defaults.withCredentials = true;

const apipostCoupon = async (props) => 
    await axios.post(`${process.env.API_URL}/shop/${process.env.SHOP_ID}/coupons`, {coupon: props})
      .then(res => ({
        code: 200,
        data: res.data,
    }))
    .catch(() => ({
        code: 500,
        data: null,
        }),
    );
const apipatchCoupon = async (props) =>
    await axios.patch(`${process.env.API_URL}/shop/${process.env.SHOP_ID}/coupons/${props.id}`, {coupon: {status: props.status}})
      .then(res => ({
          code: 200,
          data: res.data,
      }))
      .catch(() => ({
          code: 500,
          data: null,
          }),
      );
const apideleteCoupon = async (props) =>
    await axios.delete(`${process.env.API_URL}/shop/${process.env.SHOP_ID}/coupons/${props.id}`)
      .then(res => ({
          code: 200,
          data: res.data,
      }))
      .catch(() => ({
          code: 500,
          data: null,
          }),
      );
const apigetCoupon = async () =>
await axios.get(`${process.env.API_URL}/shop/${process.env.SHOP_ID}/coupons`)
    .then(res => ({
        code: 200,
        data: res.data,
    }))
    .catch(() => ({
        code: 500,
        data: null,
        }),
    );
const apicheckCoupon = async (props) =>
await axios.get(`${process.env.API_URL}/shop/${process.env.SHOP_ID}/couponcheck`, {
  params: {
    'coupon[code]': props.code }
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
export {apipostCoupon,apigetCoupon,apipatchCoupon,apideleteCoupon,apicheckCoupon};