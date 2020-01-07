import Vue from 'vue';
import Vuex from 'vuex';
import AppUser from '@/models/user';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        step: 1,
        user: new AppUser(),
        fakeData: {} as AppUser[]
    },
    mutations: {
        setStep: (state, payload: number) => {
            state.step = payload;
        },
        setUser: (state, payload: AppUser) => {
            state.user = payload;
        },
        setFakeData: (state, payload: AppUser[]) => {
            state.fakeData = payload;
        },
        updateFakeData: (state, payload: AppUser) => {
            state.fakeData = [...state.fakeData, payload];
        }
    },
    actions: {
        SetStep: (ctx, payload: number) => {
            ctx.commit('setStep', payload);
        },
        SetUser: (ctx, payload: AppUser) => {
            ctx.commit('setUser', payload);
        },
        SetFakeData: (ctx, payload: AppUser[]) => {
            ctx.commit('setFakeData', payload);
        },
        CreateNewUser: (ctx, payload: AppUser) => {
            ctx.commit('updateFakeData', payload);
            ctx.commit('setUser', payload);
            ctx.commit('setStep', 4);
        }
    },
    modules: {},
    getters: {
        getStep: state => {
            return state.step;
        },
        getUser: state => {
            return state.user;
        },
        getFakeData: state => {
            return state.fakeData;
        }
    }
});
