<template>
  <van-swipe :autoplay="3000" lazy-render>
    <van-swipe-item v-for="image in images" :key="image">
      <img :src="image" />
    </van-swipe-item>
<!--    <van-swipe-item v-for="item in dates.pics" :key="item.id">
      <img :src="item.cover_url" />
    </van-swipe-item>-->
  </van-swipe>
</template>

<script>
export default {
  name: "DetailsSwiper",
  props: {
    dates:{
      type: Object,
      default() {
          return [];
        }
      }
  },
  setup(){
    const images = [
      "https://oss.shop.eduwork.cn/product/2020-0820-5f3e177b79824.png",
      "https://oss.shop.eduwork.cn/product/2020-0820-5f3e1745869a5.png",
    ];
    return {
      images,
    }
  }
}
</script>

<style scoped>
img{
  width: 100%;
}
</style>