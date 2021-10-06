import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/:status",
    component: Home,
  },
];

const router = new VueRouter({
  routes,
  linkActiveClass: "selected",
});

export default router;
