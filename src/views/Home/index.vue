<template>
  <div>
    <p class="title">推荐歌单</p>
    <van-row gutter="6">
      <van-col span="8" v-for="obj in musicList" :key="obj.id">
        <van-image width="100%" height="3rem" fit="cover" :src="obj.picUrl" />
        <p class="song_name">{{ obj.name }}</p>
      </van-col>
    </van-row>
    <p class="title">最新音乐</p>
    <!-- 单元格组件封装到songitem中
      <van-cell
      center
      v-for="obj in music"
      :key="obj.id"
      :title="obj.name"
      :label="obj.song.artists[0].name + ' - ' + obj.name"
    >
      <template #right-icon>
        <van-icon size="0.6rem" name="play-circle-o" />
      </template>
    </van-cell> -->
    <SongItem
      v-for="obj in music"
      :key="obj.id"
      :name="obj.name"
      :artists="obj.song.artists[0].name"
      :id="obj.id"
    ></SongItem>
  </div>
</template>

<script>
import { recommendMusicAPI, recommendsMusicAPI } from "@/api";
import SongItem from "@/components/SongItem";

export default {
  data() {
    return {
      musicList: [],
      music: [],
    };
  },
  created() {
    this.getMusicList();
    this.getMusic();
  },
  methods: {
    async getMusicList() {
      const res = await recommendMusicAPI({ limit: 6 });
      if (res?.code === 200) {
        this.musicList = res.result;
      }
    },
    async getMusic() {
      const res = await recommendsMusicAPI({ limit: 20 });
      if (res?.code === 200) {
        this.music = res.result;
      }
      console.log(res);
    },
  },
  components: {
    SongItem,
  },
};
</script>

<style scoped>
/* 标题 */
.title {
  padding: 0.266667rem 0.24rem;
  margin: 0 0 0.24rem 0;
  background-color: #eee;
  color: #333;
  font-size: 15px;
}
/* 推荐歌单 - 歌名 */
.song_name {
  font-size: 0.346667rem;
  padding: 0 0.08rem;
  margin-bottom: 0.266667rem;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 2; /** 显示的行数 **/
  overflow: hidden; /** 隐藏超出的内容 **/
}
</style>