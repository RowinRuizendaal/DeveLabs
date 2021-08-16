import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    openmenu: false,
  },
  mutations: {
    openMenu(state) {
      state.openmenu = !state.openmenu;
      console.log(state.openmenu);
    },
  },
  actions: {},
  modules: {},
});
