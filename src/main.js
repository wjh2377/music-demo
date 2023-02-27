import Vue from "vue";
import App from "./App.vue";
import "@/mobile/flexible"; //适配
import "@/styles/reset.css"; //初始化样式
import router from "@/router"; //路由对象

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
