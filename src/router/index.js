//1.下包 vue-router
// 2.引入相关路由模块
import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/views/Layout";
import Home from "@/views/Home";
import Search from "@/views/Search";
import Play from "@/views/Play";

//3.注册路由模块
Vue.use(VueRouter);
//4.配置路由规则
const routes = [
  {
    path: "/",
    redirect: "/layout",
  },
  {
    path: "/layout",
    component: Layout,
    redirect: "/layout/home",
    children: [
      {
        path: "home",
        component: Home,
        meta: {
          // meta保存路由对象额外信息
          title: "首页",
        },
      },
      {
        path: "search",
        component: Search,
        meta: {
          title: "搜索",
        },
      },
    ],
  },
    {
      path: "/play",
      component: Play,
    },
];
//5.创建路由实例
const router = new VueRouter({
  routes,
  mode: "history", // hash | history 路由模式
});

export default router;
//6.把路由对象router注入到main.js中
//7.在实际要显示页面中写入占位挂载点