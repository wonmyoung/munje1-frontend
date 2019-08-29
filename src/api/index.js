import axios from "axios";
import router from "../router";

// const domain = "http://localhost:3001";
// const Unauthorized = 401;
// const onUnauthorized = () => {
//   router.push(`/login?returnPath=${encodeURIComponent(location.pathname)}`);
// };

// const request = {
//   get(path) {
//     return axios.get(`${domain + path}`).catch(({ response }) => {
//       const { status } = response;
//       if (status === Unauthorized) return onUnauthorized();
//       throw Error(response);
//     });
//   },
//   post(path, data) {
//     return axios.post(`${domain + path}`, data);
//   },
//   delete(path) {
//     return axios.delete(`${domain + path}`);
//   },
//   put(path, data) {
//     return axios.put(`${domain + path}`, data);
//   }
// };

// export const setAuthInHeader = token => {
//   console.log("api token", token);
//   axios.defaults.headers.common["Authorization"] = token
//     ? `Bearer ${token}`
//     : null;
// };

// export const auth = {
//   login(email, password) {
//     return request
//       .post("/accounts/login", { email, password })
//       .then(({ data }) => {
//         console.log("API", data);
//         data;
//       });
//   }
// };
// export const auth1 = {
//   login(email, password) {
//     return request
//       .post("/accounts/login", {
//         email,
//         password
//       })
//       .then(({ data }) => {
//         console.log("API", { data });
//         data;
//       });
//   },
//   signup(email, username, password) {
//     axios
//       .post("http://127.0.0.1:3001/accounts/join", {
//         email,
//         username,
//         password
//       })
//       .then(({ data }) => data);

// };

// };
