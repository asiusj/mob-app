import Vue from 'vue';
import VueRouter from 'vue-router';
import GreetingsPage from '@/components/greetings-page.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'greetings',
        component: GreetingsPage
    }
];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;
