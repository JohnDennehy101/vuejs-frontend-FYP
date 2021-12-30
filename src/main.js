import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home Page',
            component: HomePage
        },
        {
            path: '/login',
            name: 'Login',
            component: LoginPage
        }
    ]
});
const app = createApp(App);
app.use(router);
app.mount('#app');
