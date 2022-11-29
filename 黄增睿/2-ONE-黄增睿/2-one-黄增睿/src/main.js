import Vue from 'vue';
import './plugins/axios';
import App from './App.vue';
import router from './router';
import store from './store';
import Vant from 'vant';
import 'vant/lib/index.css';
import animate from "animate.css";

Vue.use(Vant);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  animate,
  render: h => h(App)
}).$mount('#app');
