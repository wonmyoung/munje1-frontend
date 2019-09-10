import "babel-polyfill";
import "es6-promise/auto";

import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css"; // This line here
import "@/styles/index.css"; // global css
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css"; // Ensure you are using css-loader
// import VueAwesomeSwiper from "vue-awesome-swiper";
// import "swiper/dist/css/swiper.css";
// import "vue2-dropzone/dist/vue2Dropzone.css";
// import axios from "axios";
import ElementUI from "element-ui";
import moment from "moment";
import VueMoment from "vue-moment";
import "element-ui/lib/theme-chalk/index.css";
export const eventBus = new Vue();
// import VeeValidate from "vee-validate";

// Vue.use(VeeValidate);
Vue.use(ElementUI);
Vue.use(VueMaterial);
Vue.use(VueMoment, {
  moment
});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  beforeCreate() {
    this.$store.dispatch("getAccountInfo");
  },
  render: h => h(App)
}).$mount("#app");
