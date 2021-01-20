import axios from 'axios';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common["Access-Control-Allow-Origin"] = `${process.env.API_URL}`;
axios.defaults.headers.common['Access-Control-Allow-Methods'] = "DELETE, POST, GET, PATCH";
axios.defaults.xsrfCookieName = "CSRF-TOKEN";
axios.defaults.xsrfHeaderName = "X-CSRF-Token";
axios.defaults.withCredentials = true;
const switchdelivery = async (props) => 
    await axios.post(`${process.env.API_URL}/switchdelivery`)
      .then((response) =>{
          return {
              code: 200,
              data: response
          }
      })
      .catch((error) => {
        console.log(error);
});
const switchshop = async (props) => 
    await axios.post(`${process.env.API_URL}/switchshop`)
      .then((response) =>{
          return {
              code: 200,
              data: response
          }
      })
      .catch((error) => {
        console.log(error);
});
const switchtakeaway = async (props) => 
    await axios.post(`${process.env.API_URL}/switchtakeaway`)
      .then((response) =>{
          return {
              code: 200,
              data: response
          }
      })
      .catch((error) => {
        console.log(error);
});
  const shopstatus = async() =>{
      return axios.get(`${process.env.API_URL}/shop`).then(response => {
        return response
      });
  }

export {shopstatus,switchdelivery,switchshop,switchtakeaway};