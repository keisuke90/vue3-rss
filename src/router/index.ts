import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
import FeedHome from "@/views/FeedHome.vue";

const routeSettings: RouteRecordRaw[] = [
  {
    path: "/",
    name: "feedHome",
    component: FeedHome,
  },
  {
    path: "/channel/:slug",
    name: "feedList",
    component: () => {
      return import("@/views/FeedList.vue");
    },
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routeSettings,
});

export default router;
