import axios from "axios";
const API_URL =
  process.env.REACT_APP_API_URL || "http://102.211.210.62:3001";
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
