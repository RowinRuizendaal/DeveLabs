import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { vfmPlugin } from "vue-final-modal";
import VueSpinners from "vue-spinners";
import Notifications from "vue-notification";
import VueCookie from "vue-cookie";
import Axios from "axios";

Vue.use(vfmPlugin);
Vue.use(VueSpinners);
Vue.use(Notifications);
Vue.use(VueCookie);

Vue.config.productionTip = false;

Axios.interceptors.request.use(
  (config) => {
    const token = Vue.cookie.get("token");
    const auth = token ? `Bearer ${token}` : "";
    config.headers.common["Authorization"] = auth;
    return config;
  },
  (error) => Promise.reject(error)
);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
