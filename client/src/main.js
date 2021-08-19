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

// need to refactor this is new file
Axios.defaults.headers.common["Authorization"] =
  "Bearer " + Vue.cookie.get("token");

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
