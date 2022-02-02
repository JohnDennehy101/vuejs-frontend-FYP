import { createStore } from 'vuex';

import eventModule from './modules/event.js';
import createPersistedState from "vuex-persistedstate";

const store = createStore({
    plugins: [createPersistedState()],
    modules: {event: eventModule},
    state() {
        return {
            isLoggedIn: false,
            userId: null
        }
    },
    mutations: {
        login(state) {
            state.isLoggedIn = true;
        },
        logout(state) {
            state.isLoggedIn = false;
        },
        setUserId(state, payload) {
            state.userId = payload
        }

    },
    actions: {
        login(context) {
            context.commit('login');
        },
        logout(context) {
            context.commit('logout');
        },
        setUserId(context, payload) {
            context.commit('setUserId', payload);
        }
    },
    getters: {

        isAuthenticated(state) {
            return state.isLoggedIn;
        },
        userId(state) {
            return state.userId
        }

    }
});

export default store;

