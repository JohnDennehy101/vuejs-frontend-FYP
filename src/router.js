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
  },
  {
    path: "/dashboard/createEvent",
    name: "Create Event Page",
    component: CreateEventPage,
  },
  {
    path: "/settings",
    name: "User Settings Page",
    component: UserSettingsPage,
  },
  {
    path: "/event/:userId/:eventId/poll",
    name: "Create Poll Page",
    component: CreatePollPage,
    props: true,
  },
  {
    path: "/event/:userId/:eventId/poll/:pollId",
    name: "Take Poll Page",
    component: TakePollPage,
    props: true,
  },
  {
    path: "/event/:userId/:eventId",
    name: "Event Detail Page",
    component: EventDetailPage,
    props: true,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "Route Not Found",
    component: RouteNotFound
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export { routes };
export default router;
