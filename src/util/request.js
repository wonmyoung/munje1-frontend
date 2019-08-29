import axios from "axios";
import { Message } from "element-ui";
import firebase from "firebase/app";
import "firebase/auth";
// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // base_url
  timeout: 5000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  async config => {
    // Do something before request is sent
    config.headers["Content-Type"] = "application/json";
    const user = firebase.auth().currentUser;
    if (user) {
      const token = await firebase.auth().currentUser.getIdToken();
      config.headers.Authorization = `bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// response interceptor
service.interceptors.response.use(
  response => response,
  async error => {
    if (process.env.NODE_ENV === "development") {
      // console.log("err" + error); // for debug
      Message({
        message: error.message,
        type: "error",
        duration: 5 * 1000
      });
    }
    throw error;
  }
);

export default service;
