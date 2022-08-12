import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AuthView from "../views/AuthView.vue";

import LoginComponent from "../components/auth/LoginComponent.vue";
import RegisterComponent from "../components/auth/RegisterComponent.vue";
import localStorageService from "../services/localStorage.service";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        isAuth: true,
      },
      children: [],
    },
    {
      path: "/auth",
      redirect: "/auth/login",
      component: AuthView,
      meta: {
        isGuest: true,
      },
      children: [
        {
          path: "login",
          component: LoginComponent,
        },
        {
          path: "register",
          component: RegisterComponent,
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (
    to.matched.some((record) => record.meta.isAuth) &&
    !localStorageService.getAccessToken()
  ) {
    next("/auth");
  } else if (
    to.matched.some((record) => record.meta.isGuest) &&
    localStorageService.getAccessToken()
  ) {
    next("/");
  } else {
    next();
  }
});

export default router;
