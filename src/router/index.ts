import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const history = createWebHistory();
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/home/index.vue"),
  },
  {
    path: "/homepage",
    name: "homepage",
    component: () => import("../views/home/homepage.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/index.vue"),
  },
  {
    path: "/curd",
    name: "curd",
    component: () => import("../views/curd/index.vue"),
  },
];
const router = createRouter({
  history,
  routes,
});
export default router;
