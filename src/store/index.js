import Vue from "vue";
import Vuex from "vuex";
import { auth } from "./../services/AuthService.js";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isAuthenticated: auth.isAuthenticated(),
    userId: auth.gettingUserId()
  },
  mutations: {
    changeIsAuthenticated(state, value) {
      state.isAuthenticated = value;
    },
    changeUserId(state, value) {
      state.userId = value;
    }
  },
  actions: {
    changeAuthentication(context) {
      const newState = auth.isAuthenticated();
      context.commit("changeIsAuthenticated", newState);
    },
    checkUserId(context) {
      const user_id = auth.gettingUserId();
      context.commit("changeUserId", user_id);
    },
    deleteUserId(context) {
      context.commit("changeUserId", null);
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated;
    },
    getUserId(state) {
      return +state.userId;
    }
  }
});

export default store;
