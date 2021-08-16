import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { vfmPlugin } from "vue-final-modal";
import VueSpinners from "vue-spinners";
import Notifications from "vue-notification";

Vue.use(vfmPlugin);
Vue.use(VueSpinners);
Vue.use(Notifications);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
