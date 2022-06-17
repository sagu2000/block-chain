import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import VoteVue from "../views/Vote.vue";
import AdminVue from "../views/Admin.vue";
import UserVue from "../views/User.vue";
import { user } from "../store/user";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "About",
      component: () => import("../views/AboutView.vue"),
    },
    {
      name: "SignIn",
      path: "/signin",
      component: SignIn,
    },
    {
      name: "SignUp",
      path: "/signup",
      component: SignUp,
    },
    {
      name: "Vote",
      path: "/vote",
      component: VoteVue,
      meta: {
        requiresAuth: true,
      },
    },
    {
      name: "User",
      path: "/user",
      component: UserVue,
      meta: {
        requiresAuth: true,
      },
    },
    {
      name: "Admin",
      path: "/admin",
      component: AdminVue,
      meta: {
        requiresAuth: true,
        isAdmin: true,
      },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.meta && to.meta.requiresAuth && !user.state.token) {
    next({
      name: "SignIn",
      params: { nextUrl: to.fullPath },
    });
    return;
  }
  if (to.meta && to.meta.isAdmin && user.state.role != "Admin") {
    next({
      name: "Home",
    });
    return;
  }
  next();
});

export default router;
