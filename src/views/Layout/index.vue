<template>
  <div>
    <van-nav-bar fixed :title="activeTitle" />
    <div class="main">
      <!-- 二级路由 -->
      <router-view></router-view>
    </div>

    <van-tabbar route>
      <van-tabbar-item replace to="/layout/home" icon="home-o"
        >首页</van-tabbar-item
      >
      <van-tabbar-item replace to="/layout/search" icon="search"
        >搜索</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTitle: this.$route.meta.title, //"默认"顶部导航要显示的标题文字（获取路由中meta中的title值）
    };
  },
  watch: {
    $route() {
      this.activeTitle = this.$route.meta.title; //侦听路由切换后的顶部导航要显示的信息
    },
  },
};
</script>

<style scoped>
/* 中间内容区域 - 容器样式(留好上下导航所占位置) */
.main {
  padding-top: 46px;
  padding-bottom: 50px;
}
</style>