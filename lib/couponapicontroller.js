import {unSeralizer,axios} from './libhelpers';

const apipostCoupon = async (props) => 
    await axios.post(`${process.env.API_URL}/shops/${process.env.SHOP_ID}/coupons`, {coupon: props})
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
    await axios.patch(`${process.env.API_URL}/shops/${process.env.SHOP_ID}/coupons/${props.id}`, {coupon: {status: props.status}})
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
    await axios.delete(`${process.env.API_URL}/shops/${process.env.SHOP_ID}/coupons/${props.id}`)
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
await axios.get(`${process.env.API_URL}/shops/${process.env.SHOP_ID}/coupons`)
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
await axios.get(`${process.env.API_URL}/shops/${process.env.SHOP_ID}/couponcheck`, {
  params: {
    'coupon[code]': props.code }
  })
    .then(response => {
        return {data: unSeralizer(response.data), status: response.data.status}
    })
    .catch(() => ({
        code: 500,
        data: null,
        }),
    );
export {apipostCoupon,apigetCoupon,apipatchCoupon,apideleteCoupon,apicheckCoupon};