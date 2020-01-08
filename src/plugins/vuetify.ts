import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#1E1A3E',
                secondary: '#b0bec5',
                third: '#ffffff',
                accent: '#8c9eff',
                error: '#b71c1c',
                info: '#707070'
            }
        },
        options: {
            customProperties: true
        }
    }
});
