import axios from 'axios';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = `${process.env.API_URL}`;
axios.defaults.headers.common['Access-Control-Allow-Methods'] = "DELETE, POST, GET, PATCH";
axios.defaults.xsrfCookieName = "CSRF-TOKEN";
axios.defaults.xsrfHeaderName = "X-CSRF-Token";
axios.defaults.withCredentials = true;
const login = (data) => {
    return axios.get('http://localhost:3000/login').then(response => {
      return axios.post("http://localhost:3000/login", {
        user:{...data}
      })
      .then(response => {
        localStorage.setItem("isLogged", true)
        console.log(response);
        return response.data;
      }).catch(error => {
        localStorage.setItem("isLogged", false);
        return error.response;
    });
    });
  }
  const logout = async () => {
      return axios.get('http://localhost:3000/login').then( () => {
        return axios.delete("http://localhost:3000/logout")
        .then(response => {
          localStorage.setItem("isLogged", false);
          return false;
        });
      })
    }
  const isLogged = async() =>{
      return axios.get('http://localhost:3000/login').then(response => {
        return response
      });
  }

export {login,logout,isLogged};