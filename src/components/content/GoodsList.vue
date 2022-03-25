<template>
  <van-grid :border="false" :column-num="2">
    <van-grid-item v-for="item in showGoods" :key="item.id">
      <router-link :to="{name:'details',params:{id:item.id}}">
        <img v-lazy="item.cover_url">
      </router-link>
      <h6>{{item.title}}</h6>
      <div class="content">
        <span>价格:</span>
        <span :class="collect" @click="addCollect(item.id)">￥{{item.price}}</span>
      </div>
    </van-grid-item>
  </van-grid>
</template>

<script>
export default {
  name: "GoodsList",
  props:{
    showGoods:{
      type:Array,
      default(){
        return [];
      }
    }
  },
}
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;
}
h6 {
  margin: 0;
  line-height: 24px;
}
.content{
  width: 120px;
  overflow: hidden;
}
span{
  margin: 2px;
}
span:last-child{
  display: inline-block;
}
</style>