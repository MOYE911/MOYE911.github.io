import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    show: true,
    dateshow: false,
    showmle: JSON.parse(window.localStorage.getItem("showmle") || "true"),
  },
  getters: {
  },
  mutations: {
    Navshow(Store) {
      Store.show = false;
      Store.showmle = Store.show;
    },
    Navfshow(Store) {
      Store.show = true;
      Store.showmle = Store.show;
    },
    Navshowf(Store) {
      Store.showmle = !Store.showmle;
    },
    Dateshow(Store) {
      Store.dateshow = !Store.dateshow;
    },
  },
  actions: {
  },
  modules: {
  }
});
