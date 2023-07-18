import Axios from 'axios';
const axios = Axios.create({
    // baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
});

export const Http = {
  get: function get(url) {
    return axios.get(url).then(res => res.data);
  },
  post: function post(url, body) {
    return axios.post(url, body).then(res => res.data);
  },
  patch: function post(url, body) {
    return axios.patch(url, body).then(res => res.data);
  },
  delete: function del(url, body) {
    return axios.delete(url, body).then(res => res.data);
  },
};
