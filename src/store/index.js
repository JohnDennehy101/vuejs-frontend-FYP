import { createStore } from 'vuex';

import eventModule from './modules/event.js';
import createPersistedState from "vuex-persistedstate";

const store = createStore({
    plugins: [createPersistedState()],
    modules: {event: eventModule},
    state() {
        return {
            isLoggedIn: false,
            userId: null,
            userEmail: null
        }
    },
    mutations: {
        login(state) {
            state.isLoggedIn = true;
        },
        logout(state) {
            state.userId = null;
            state.userEmail = null;
            state.isLoggedIn = false;
        },
        setUserId(state, payload) {
            state.userId = payload
        },
        setUserEmail(state, payload) {
            state.userEmail= payload
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
        },
        setUserEmail(context, payload) {
            context.commit('setUserEmail', payload);
        }
    },
    getters: {

        isAuthenticated(state) {
            return state.isLoggedIn;
        },
        userId(state) {
            return state.userId
        },
        userEmail(state) {
            return state.userEmail
        }

    }
});

export default store;

