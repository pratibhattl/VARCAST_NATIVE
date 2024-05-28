//All method services
import axios from 'axios';
import AllSourcePath from '../Constants/PathConfig';

const apiCall = (
  endpoint,
  method = 'POST', // Default method is POST
  data = {},
  token = '',
  ContentType = 'application/json',
  baseUrl = AllSourcePath.API_BASE_URL_DEV,
) => {
  console.log('params', data);
  
  return new Promise((resolve, reject) => {
    // Ensure method is a string and convert to uppercase
    const config = {
      method:
        method && typeof method === 'string' ? method.toLowerCase() : 'POST',
      url: baseUrl + endpoint,
      headers: {
        Accept: 'application/json',
        'Content-Type': ContentType,
        Authorization: `Bearer ${token}`,
        'X-localization': 'en',
      },
    };

    if (config.method === 'POST' || config.method === 'PUT') {
      config.data = data;
    } else {
      config.params = data;
    }

    axios(config)
      .then(response => {
        console.log("Response",response.data);
        resolve(response.data);
      })
      .catch(error => {
        console.log(error);
        if (error.response) {
          if (error.response.data) {
            reject(error.response.data);
          } else {
            error.msg = error.message ? error.message : 'Unknown Error';
            reject(error);
          }
        } else {
          error.msg = error.message ? error.message : 'Unknown Error';
          reject(error);
        }
      });
  });
};

export {apiCall};
