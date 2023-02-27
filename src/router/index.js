import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/views/Layout";
import Home from "@/views/Home";
import Search from "@/views/Search";
import Play from "@/views/Play";

Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    redirect: "/layout",
  },
  {
    path: "/layout",
    component: Layout,
    children: [
      {
        path: "home",
        component: Home,
      },
      {
        path: "search",
        component: Search,
      },
    ],
  },
  {
    path: "/play",
    component: Play,
  },
];

const router = new VueRouter({
    routes
})

export default router
