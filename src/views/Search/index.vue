<template>
  <div>
    <!-- 搜索框 -->
    <van-search
      @input="inputFn"
      shape="round"
      v-model="value"
      placeholder="请输入搜索关键词"
    />
    <!-- 热搜容器 -->
    <div class="search_wrap" v-if="searchList.length === 0">
      <!-- 热门搜索标题 -->
      <p class="hot_title">热门搜索</p>
      <!-- 热搜词容器 -->
      <div class="hot_name_wrap">
        <span
          class="hot_item"
          v-for="(obj, index) in searchArr"
          :key="index"
          @click="fn(obj.first)"
          >{{ obj.first }}</span
        >
      </div>
    </div>
    <!-- 搜索容器 -->
    <van-list
      v-else
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="search_wrap">
        <!-- 热门搜索标题 -->
        <p class="hot_title">搜索结果</p>
        <!-- <van-cell
          center
          v-for="obj in searchList"
          :key="obj.id"
          :title="obj.name"
          :label="obj.ar[0].name + ' - ' + obj.name"
        >
          <template #right-icon>
            <van-icon size="0.6rem" name="play-circle-o" />
          </template>
        </van-cell> -->

        <SongItem
          v-for="obj in searchList"
          :key="obj.id"
          :name="obj.name"
          :artists="obj.ar[0].name"
          :id="obj.id"
        ></SongItem>
      </div>
    </van-list>
  </div>
</template>

<script>
import { searchListAPI, searchAPI } from "@/api";
import SongItem from "@/components/SongItem";

export default {
  data() {
    return {
      value: "",
      searchArr: [],
      searchList: [],
      loading: false,
      finished: false,
      page: 1,
      timer: null,
    };
  },
  created() {
    this.getSearch();
  },
  methods: {
    //热搜关键词
    async getSearch() {
      const res = await searchListAPI();
      if (res.code === 200) {
        this.searchArr = res.result.hots;
      }
    },
    //搜索
    async getSearchs() {
      return await searchAPI({
        keywords: this.value,
        limit: 20,
        offset: (this.page - 1) * 20,
      });
    },
    //热搜词点击
    async fn(val) {
      this.page = 1;
      this.finished = false;
      this.value = val;
      const res = await this.getSearchs();
      this.searchList = res.result.songs;
      console.log(this.searchList);
      this.loading = false;
    },
    //输入框改变
    async inputFn() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(async () => {
        this.page = 1;
        this.finished = false;
        if (this.value.length === 0) {
          //如果搜索关键词为空，清空搜索结果，阻止网络请求发送
          this.searchList = [];
          return;
        }
        const res = await this.getSearchs();
        if (res.result.songs === undefined) {
          //没有数据
          this.searchList = [];
          return;
        }
        this.searchList = res.result.songs;
        console.log(this.searchList);
        this.loading = false;
      }, 800);
    },
    //触底事件，要加载下一页的数据
    async onLoad() {
      this.page++;
      const res = await this.getSearchs();
      if (res.result.songs === undefined) {
        //没有 更多 数据
        this.finished = true;
        this.loading = false;
        return;
      }
      this.searchList = [...this.searchList, ...res.result.songs];
      this.loading = false;
    },
  },
  components: {
    SongItem,
  },
};
</script>

<style scoped>
/* 搜索容器的样式 */
.search_wrap {
  padding: 0.266667rem;
}

/*热门搜索文字标题样式 */
.hot_title {
  font-size: 0.32rem;
  color: #666;
}

/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}
.title {
  padding: 0.266667rem 0.24rem;
  margin: 0 0 0.24rem 0;
  background-color: #eee;
  color: #333;
  font-size: 15px;
}
.van-cell {
  border-bottom: 1px solid lightgray;
}
</style>