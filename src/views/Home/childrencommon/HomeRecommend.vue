<template>
  <div class="wrapper">
    <van-grid id="list" class="list" :border="false" :column-num="4">
      <van-grid-item :to="{name:'details',params:{id:item.id}}" v-for="item in recommend" :key="item.id">
        <img :src="item.cover_url">
        <h6>{{item.title}}</h6>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {
  name: "HomeRecommend",
  props: {
    recommend:{
      type: Array,
      default() {
        return [];
      }
    }
  }
}
</script>

<style scoped>
  img{
    width: 100%;
    height: auto;
  }
  .wrapper{
    overflow: hidden;
    padding-bottom: 8px;
    background: #eee;
  }
  .wrapper .list{
    width: 100%;
    height: auto;
    display: inline;
    white-space: nowrap;
    overflow-x: scroll;
    float: left;
    overflow-y: hidden;
  }
  .wrapper .list .van-grid-item{
    display: inline-block;
    margin: 0;
    width: 26%;
  }
  .wrapper .list .van-grid-item h6{
    margin: 0;
  }
</style>