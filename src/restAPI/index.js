import { apiBaseUrl } from "../theme/constants";
import axios from 'axios';
const processResponse = true;

class API {
  request(name, postData, method, queryString = "") {
    let headers = { "Content-Type": "application/json" };
    //Get token value from localstorage
    const token = localStorage.getItem('token');

    //Check if token is not defined and attach to query string
    if (token !== undefined) {
      headers = { ...headers, Authorization: `Bearer ${token}` };
    }
    return new Promise(function(resolve, reject) {
      var url = apiBaseUrl + name + queryString;
      if (method === undefined) {
        method = "post";
      }
      axios
        .request({
          method: method,
          url: url,
          data: postData,
          headers: headers
        }) 
        .then(async (response) => {
            console.log("response",response)
          if (processResponse) {
			let body = [];
			try {
              body = response.data
            } catch (error) {
              body = response.data
            }	
			response.data = body;
            resolve(response);
          } else {
            resolve(response);
          }
        })
        .catch(function(err) {
		  if (err && err.response) {	
			let body = [];
			try {
			  body = err.response.data
			} catch (error) {
              body = err.response.data;
            }
			err.response.data = body;
			if (
              err &&
              err.response &&
              err.response.status &&
              err.response.status === 401 &&
              err.response.data &&
              err.response.data.error &&
              err.response.data.error.code &&
              err.response.data.error.code === "AUTHORIZATION_REQUIRED"
            ) {
                localStorage.removeItem("token")
			  window.location.href = "/";	
			} else {
              reject(err.response);
            }	
		  } else {
			reject(err);	
		  }	
        });
    });
  }
}

export default API;