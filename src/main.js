import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import Vuex from "vuex";
import ElementUI from "element-ui";
import Swal from "sweetalert2";
//
import "./assets/styles/style.css";
//
import App from "./App.vue";
import router from "./router/index";
import store from "./stores";
import "animate.css";

axios.defaults.withCredentials = true;

Vue.use(VueAxios, axios, ElementUI, Swal);
Vue.use(Vuex);
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    // 到的頁面有requiresAuth不放行
    const api = `${import.meta.env.VITE_API_URL}/api/user/check`;
    console.log(api);
    axios.post(api).then((res) => {
      if (res.data.success) {
        console.log(res.data);
        next();
      } else {
        console.log(res.data);
        next({ path: "/" });
      }
    });
  } else {
    next();
  }
});
