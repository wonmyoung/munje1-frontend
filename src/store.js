import Vue from "vue";
import Vuex from "vuex";
import router from "./router";
import axios from "axios";
import { BASE_URL } from "./config/env";
Vue.use(Vuex);
// axios.defaults.headers = "Access-Control-Allow-Origin: *";
const header = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
  "X-Content-Type-Options": "nosniff",
  "X-XSS-Protection": "1"
};

export default new Vuex.Store({
  state: {
    userInfo: {
      username: null,
      email: null,
      avatar: null,
      _id: null,
      resultData: [],
      myExam: [],
      iaAdmin: false
    },
    isLogin: false,
    isLoginEorror: false,
    visible: true
  },
  mutations: {
    LOGIN(state, userInfo) {
      state.isLogin = true;
      state.isLoginEorror = false;
      state.userInfo = userInfo;
      state.visible = true;
      router.push({ name: "home" });
    },
    loginSuccess(state, obj) {
      state.isLogin = true;
      state.isLoginEorror = false;
      state.userInfo = obj;
    },
    loginError(state) {
      state.isLogin = false;
      state.isLoginError = true;
    },
    logout(state) {
      state.isLogin = false;
      state.isLoginError = false;
      state.userInfo = null;
    },
    SET_VISIBLE(state) {
      console.log("SET_VISIBLE_MU");
      state.visible = false;
    },
    UPDATE_USER_DATA(state, userInfo) {
      if (userInfo.username) {
        state.userInfo.username = userInfo.username;
      }
      if (userInfo.avatar) {
        state.userInfo.avatar = userInfo.avatar;
      }
      if (userInfo.email) {
        state.userInfo.email = userInfo.email;
      }
      if (userInfo.resultData) {
        state.userInfo.resultData.push(userInfo.resultData);
      }
      if (userInfo.myExam) {
        state.userInfo.myExam.push(userInfo.myExam);
      }
    }
  },
  actions: {
    /**
     * LOGIN
     * @param {email} param0
     * @param {*password} param1
     */
    LOGIN({ dispatch }, { email, password }) {
      axios
        .post(BASE_URL + "/accounts/login", { email, password })
        .then(res => {
          let { data } = res;
          localStorage.removeItem("accessToken");
          console.log("accessToken", data.accessToken);
          if (data.accessToken == undefined) {
            alert("이메일과 비밀번호를 정확히 입력해주세요");
          }
          localStorage.accessToken = data.accessToken;
          dispatch("getAccountInfo");
        })
        .catch(err => {
          alert("서버 점검중입니다");
        });
    },

    /*
     * LOGOUT
     */
    LOGOUT({ commit }) {
      axios
        .get(BASE_URL + "/accounts/logout")
        .then(res => {
          localStorage.removeItem("accessToken");
          commit("logout");
          router.push({ name: "home" });
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     *
     */
    getAccountInfo({ commit }) {
      let accessToken = localStorage.getItem("accessToken");
      let config = {
        headers: {
          accessToken: accessToken
        }
      };
      window.console.log("accessToken", accessToken);
      if (accessToken) {
        axios.get(BASE_URL + "/accounts/profile", config).then(response => {
          console.log("response", response);
          let userInfo = {
            _id: response.data.userInfo._id,
            username: response.data.userInfo.username,
            email: response.data.userInfo.email,
            avatar: response.data.userInfo.avatar,
            resultData: JSON.parse(
              JSON.stringify(response.data.userInfo.resultData)
            ),
            myExam: JSON.parse(JSON.stringify(response.data.userInfo.myExam))
          };

          commit("LOGIN", userInfo);
        });
        // .catch(error => {
        //   console.log("errr", error);
        //   alert("아이디와 비번을 다시 확인하세요");
        // });
      }
    },
    SET_VISIBLE_NAVBAR({ commit }) {
      commit("SET_VISIBLE");
    },
    UPDATE_USER_DATA({ commit }, { userInfo }) {
      commit("UPDATE_USER_DATA", userInfo);
    }
  }
});
