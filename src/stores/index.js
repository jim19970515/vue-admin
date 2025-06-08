import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
export default new Vuex.Store({
  strict: true,
  state: {
    modal: false,
    products: [],
    pagination: {},
    user: {
      username: "",
      password: ""
    }
  },
  actions: {
    modalHandler(context, status) {
      context.commit("MODAL", status);
    },
    async getProducts(context, page) {
      const { data } = await axios.get(
        `https://vue-course-api.hexschool.io/api/f0920515972/admin/products?page=${page}`
      );
      context.commit("PRODUCTS", data.products);
      context.commit("PAGINATION", data.pagination);
      console.log(data);
    },
    async signin() {
      const { data } = await axios.get(
        `https://vue-course-api.hexschool.io/api/f0920515972/admin/products?page=${page}`
      );
    }
  },
  mutations: {
    MODAL(state, status) {
      state.modal = status;
    },
    PRODUCTS(state, payload) {
      state.products = payload;
    },
    PAGINATION(state, payload) {
      state.pagination = payload;
    },
    Login(state, payload) {
      state.username = payload.username;
      state.password = payload.password;
    }
  }
});
