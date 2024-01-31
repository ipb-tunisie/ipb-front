import axios from "axios";
const API_URL =
  process.env.REACT_APP_API_URL || "https://www.api.ipb-tunisie.tn";
console.log("API_URL : ", API_URL);

axios.defaults.baseURL = `${API_URL.trim()}`;
axios.defaults.withCredentials = false;

axios.interceptors.response.use(null, (error) => {
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
};
