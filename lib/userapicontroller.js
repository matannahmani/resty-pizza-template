import axios from 'axios';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common["Access-Control-Allow-Origin"] = `${process.env.API_URL}`;
axios.defaults.headers.common['Access-Control-Allow-Methods'] = "DELETE, POST, GET, PATCH";
axios.defaults.xsrfCookieName = "CSRF-TOKEN";
axios.defaults.xsrfHeaderName = "X-CSRF-Token";
axios.defaults.withCredentials = true;
const login = (data) => {
    return axios.get(`${process.env.API_URL}/shop/${process.env.SHOP_ID}/login`).then(response => {
      return axios.post(`${process.env.API_URL}/shop/${process.env.SHOP_ID}/login`, {
        user:{...data}
      })
      .then(response => {
        return response.data;
      }).catch(error => {
        return error.response;
    });
    });
  }
  const logout = async () => {
      return axios.get(`${process.env.API_URL}/shop/${process.env.SHOP_ID}/login`).then( () => {
        return axios.delete(`${process.env.API_URL}/shop/${process.env.SHOP_ID}/logout`)
        .then(response => {
          return false;
        });
      })
    }
  const isLogged = async() =>{
      return axios.get(`${process.env.API_URL}/shop/${process.env.SHOP_ID}/login`).then(response => {
        return response
      });
  }

export {login,logout,isLogged};