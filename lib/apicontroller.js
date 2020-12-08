import axios from 'axios';
const apipostCoupon = async (props) => 
    await axios.post('http://localhost:3000/coupons', {coupon: props})
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
    axios.patch(`http://localhost:3000/coupons/${props.id}`, {coupon: {status: props.status}})
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}
const apideleteCoupon = (props) => {
    axios.delete(`http://localhost:3000/coupons/${props.id}`)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}
const apigetCoupon = async () =>
await axios.get('http://localhost:3000/coupons')
    .then(res => ({
        code: 200,
        data: res.data,
    }))
    .catch(() => ({
        code: 500,
        data: null,
        }),
    );

export {apipostCoupon,apigetCoupon,apipatchCoupon,apideleteCoupon};