import Vue from 'vue';
import Vuex from 'vuex';
import AppUser from '@/models/user';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: new AppUser()
    },
    mutations: {},
    actions: {},
    modules: {},
    getters: {
        getUser: state => {
            return state.user;
        }
    }
});
