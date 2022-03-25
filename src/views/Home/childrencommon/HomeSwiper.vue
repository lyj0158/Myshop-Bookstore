<template>
  <van-swipe :autoplay="3000" lazy-render>
    <van-swipe-item v-for="item in banner" :key="item.id">
      <img :src="item.img_url">
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  name: "HomeSwiper",
  props: {
    banner:{
      type: Array,
      default() {
        return [];
      },
    }
  }
}
</script>

<style scoped>
img{
  width: 100%;
  height: 160px;
}
</style>