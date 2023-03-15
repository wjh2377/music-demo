<template>
  <van-cell center :title="name" :label="artists + ' - ' + name">
    <template #right-icon>
      <van-icon size="0.6rem" name="play-circle-o" @click="playFn" />
    </template>
  </van-cell>
</template>

<script>
export default {
  props: {
    name: String, //歌名
    artists: String, //歌手
    id: Number, //id，便于
  },
  methods: {
    playFn() {
      this.$router.push({
        path: "/play",
        query: {
          id: this.id,
        },
      });
    },
  },
};
</script>

<style scoped>
.van-cell {
  border-bottom: 1px solid lightgray;
}
</style>