import { createApp } from 'vue'
import App from './App.vue'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import store from './store/index.js';
import router from './router'


const app = createApp(App);
app.use(router);

app.use(store);
app.mount('#app');
