import axios from "axios";
import Vue from "vue";

axios.defaults.headers.common["Authorization"] =
  "Bearer " + Vue.cookie.get("token");
