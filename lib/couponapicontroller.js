import axios from 'axios';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = `${process.env.API_URL}`;
axios.defaults.headers.common['Access-Control-Allow-Methods'] = "DELETE, POST, GET, PATCH";
axios.defaults.withCredentials = true;

const apipostCoupon = async (props) => 
    await axios.post(`${process.env.API_URL}/coupons`, {coupon: props})
      .then((response) =>{
          return {
              code: 200,
              data: response.data
          }
      })
      .catch((error) => {
        console.log(error);
      });
const apipatchCoupon = (props) => {
    axios.patch(`${process.env.API_URL}/coupons/${props.id}`, {coupon: {status: props.status}})
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}
const apideleteCoupon = (props) => {
    axios.delete(`${process.env.API_URL}/coupons/${props.id}`)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}
const apigetCoupon = async () =>
await axios.get(`${process.env.API_URL}/coupons`)
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
await axios.get(`${process.env.API_URL}/couponcheck`, {
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