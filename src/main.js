import Vue from 'vue'
import App from './App.vue'
import router from './router'


Vue.config.productionTip = false;
Vue.prototype.$channel_post_url = 'https://t.me/c/1267720962/'
//Vue.prototype.$API_URL = "http://127.0.0.1:3374/api/v1/"
Vue.prototype.$API_URL = "https://aniposter.net/api/v1/"

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
