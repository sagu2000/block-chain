import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import VoteVue from "../views/Vote.vue";
import { user } from "../store/user";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
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
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.requiresAuth && !user.state.token) {
    next({
      name: "SignIn",
      params: { nextUrl: to.fullPath },
    });
    return;
  }
  next();
});

export default router;
