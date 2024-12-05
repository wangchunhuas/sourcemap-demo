import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Error from "../pages/Error.vue";
const routes = [
  {
    name: "home",
    path: "/",
    component: Home,
  },
  {
    name: "about",
    path: "/about",
    component: () => import("../pages/About.vue"),
  },
  {
    name: "error",
    path: "/error",
    component: Error,
  },
  {
    name: "record",
    path: "/record",
    component: () => import("../pages/ScreenRecord.vue"),
  },
  {
    name: "play",
    path: "/play",
    component: () => import("../pages/playScreen.vue"),
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
