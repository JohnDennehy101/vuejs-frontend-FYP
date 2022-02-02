import { createStore } from 'vuex';

import eventModule from './modules/event.js';
import createPersistedState from "vuex-persistedstate";

const store = createStore({
    plugins: [createPersistedState()],
    modules: [
        eventModule
    ],
    state() {
        return {
            isLoggedIn: false
        }
    },
    mutations: {
        login(state) {
            state.isLoggedIn = true;
        },
        logout(state) {
            state.isLoggedIn = false;
        }

    },
    actions: {
        login(context) {
            context.commit('login');
        },
        logout(context) {
            context.commit('logout');
        }
    },
    getters: {

        isAuthenticated(state) {
            return state.isLoggedIn;
        }

    }
});

export default store;

