import Vue from 'vue';
import VueRouter from 'vue-router';
import GreetingsPage from '@/components/greetings-page.vue';
import HomePage from '@/components/home-page.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'greetings',
        component: GreetingsPage
    },
    {
        path: '/home',
        name: 'homepage',
        component: HomePage
    }
];

const router = new VueRouter({
    base: '/mob-app/',
    mode: 'history',
    routes
});

export default router;
