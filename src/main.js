import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import LoginPage from './pages/LoginPage'
import ConfirmAccountPage from './pages/ConfirmAccountPage'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import CreateEventPage from './pages/CreateEventPage'
import CreatePollPage from './pages/CreatePollPage'
import TakePollPage from './pages/TakePollPage'
import EventDetailPage from './pages/EventDetailPage'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

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
        },
        {
            path: '/user/account-verification',
            name: 'Confirm Email',
            component: ConfirmAccountPage
            
        },
        {
            path: '/register',
            name: 'Register',
            component: RegisterPage
        },
        {
            path: '/dashboard/:id',
            name: 'Dashboard',
            component: DashboardPage
        },
        {
            path: '/dashboard/createEvent',
            name: 'Create Event Page',
            component: CreateEventPage
        },
        {
            path: '/event/:userId/:eventId/poll',
            name: 'Create Poll Page',
            component: CreatePollPage,
            props: true
        },
         {
            path: '/event/:userId/:eventId/poll/:pollId',
            name: 'Take Poll Page',
            component: TakePollPage,
            props: true
        },
        {
            path: '/event/:userId/:eventId',
            name: 'Event Detail Page',
            component: EventDetailPage,
            props: true
        }
    ]
});
const app = createApp(App);
app.use(router);
app.mount('#app');
