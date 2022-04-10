import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import ConfirmAccountPage from "./pages/ConfirmAccountPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import CreateEventPage from "./pages/CreateEventPage";
import CreatePollPage from "./pages/CreatePollPage";
import TakePollPage from "./pages/TakePollPage";
import EventDetailPage from "./pages/EventDetailPage";
import UserSettingsPage from "./pages/UserSettingsPage";
import RouteNotFound from "./components/RouteNotFound";
import { createRouter, createWebHistory } from "vue-router";
import store from "./store/index";

const routes = [
  {
    path: "/",
    name: "Home Page",
    component: HomePage,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/logout",
    name: "Logout",
    component: LogoutPage,
  },
  {
    path: "/user/account-verification",
    name: "Confirm Email",
    component: ConfirmAccountPage,
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterPage,
  },
  {
    path: "/dashboard/:id",
    name: "Dashboard",
    component: DashboardPage,
    meta: {
      authenticationRequired: true,
    },
  },
  {
    path: "/dashboard/createEvent",
    name: "Create Event Page",
    component: CreateEventPage,
    meta: {
      authenticationRequired: true,
    },
  },
  {
    path: "/settings",
    name: "User Settings Page",
    component: UserSettingsPage,
    meta: {
      authenticationRequired: true,
    },
  },
  {
    path: "/event/:userId/:eventId/poll",
    name: "Create Poll Page",
    component: CreatePollPage,
    props: true,
    meta: {
      authenticationRequired: true,
    },
  },
  {
    path: "/event/:userId/:eventId/poll/:pollId",
    name: "Take Poll Page",
    component: TakePollPage,
    props: true,
    meta: {
      authenticationRequired: true,
    },
  },
  {
    path: "/event/:userId/:eventId",
    name: "Event Detail Page",
    component: EventDetailPage,
    props: true,
    meta: {
      authenticationRequired: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "Route Not Found",
    component: RouteNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach(function (to, from, next) {
  console.log()
  if (to.meta.authenticationRequired && !store.getters.isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export { routes };
export default router;
