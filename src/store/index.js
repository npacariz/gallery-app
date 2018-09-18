import Vue from 'vue';
import Vuex from 'vuex';
import { auth } from "./../services/AuthService.js"
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        isAuthenticated: auth.isAuthenticated()
    },
    mutations: {
        changeIsAuthenticated(state, value) {
            state.isAuthenticated = value;
        }
    },
    actions: {
        changeAuthentication(context) {
            const newState = auth.isAuthenticated();
            context.commit('changeIsAuthenticated', newState);
        }
    },
    getters: {
        isAuthenticated(state) {
            return state.isAuthenticated
        }
    }
})

export default store;