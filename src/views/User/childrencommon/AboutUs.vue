<template>
  <van-nav-bar
      title="关于我们"
      left-arrow
      @click-left="onClickLeft"
  />
  <h2>MyShop旗舰店</h2>
  <p>MyShop旗舰店是一家专业售卖有关网络技术相关的商城MyShop旗舰店是一家专业售卖有关网络技术相关的商城MyShop旗舰店是一家专业售卖有关网络技术相关的商城MyShop旗舰店是一家专业售卖有关网络技术相关的商城MyShop旗舰店是一家专业售卖有关网络技术相关的商城</p>
</template>

<script>
export default {
  name: "AboutUs",
  setup(){
    const onClickLeft = () => history.back();
    return {
      onClickLeft,
    }
  }
}
</script>

<style scoped>

</style>