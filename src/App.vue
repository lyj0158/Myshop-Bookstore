<template>
  <router-view/>
  <van-tabbar active-color="#f05549" route placeholder>
    <van-tabbar-item to="/" icon="wap-home-o">首页</van-tabbar-item>
    <van-tabbar-item to="/categories" icon="apps-o">分类</van-tabbar-item>
    <van-tabbar-item to="/cart" icon="shopping-cart-o" :badge="$store.state.carcount">购物车</van-tabbar-item>
    <van-tabbar-item to="/user" icon="contact" dot>我的</van-tabbar-item>
  </van-tabbar>
  <van-overlay :show="$store.state.loading">
    <div class="loadings">
      <van-loading size="24px" vertical>加载中...</van-loading>
    </div>
  </van-overlay>
</template>

<script>
import {useStore} from 'vuex';
import {onMounted} from "vue";
export default {
  setup(){
    onMounted(()=>{
      const store = useStore();
      store.dispatch('upCarNum')
    })
  }
}
</script>

<style lang="scss">
@import "../src/assets/css/base.css";
body{
  padding-top: 46px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
:root{
  --van-tabbar-background-color: #eee !important;
  --van-tabbar-item-active-background-color: #eee !important;
  --van-nav-bar-background-color: #f05549 !important;
  --van-nav-bar-icon-color: white !important;
  --van-nav-bar-title-text-color: white !important;
  --van-nav-bar-arrow-size: 24px !important;
  --van-nav-bar-title-font-size: 18px !important;
  --van-card-thumb-size: 80px !important;
  --van-card-font-size: 16px !important;
  --van-card-desc-line-height:28px !important;
  --van-contact-card-eidt-icon-size:0px !important;
}
nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.van-overlay{
  z-index: 999 !important;
}
.loadings {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.van-nav-bar{
  position: fixed !important;
  width: 100% !important;
  top: 0px;
}
.van-swipe-cell__wrapper{
  display: flex !important;
  flex-wrap: wrap;
}
.van-address-list__bottom {
  bottom:50px !important;
  border: 1px solid white !important;
}
.van-address-list__add{
}
.van-cell__left-icon{
  display: none !important;
}
</style>
