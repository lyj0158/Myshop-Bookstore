<template>
  <div class="home">
    <van-nav-bar title="首页" />
    <HomeSwiper :banner="banner"></HomeSwiper>
    <HomeRecommend :recommend="recommend"></HomeRecommend>
    <van-tabs @click-tab="onClickTab" title-active-color="#f05549" color="#f05549">
      <van-tab title="畅销" name="sales"></van-tab>
      <van-tab title="新书" name="new"></van-tab>
      <van-tab title="精选" name="recommend"></van-tab>
    </van-tabs>
    <div class="wrappers">
      <GoodsList :showGoods="showGoods"></GoodsList>
      <div style="height: 40px;width: 100%"></div>
    </div>
  </div>

</template>

<script>
import HomeSwiper from "@/views/Home/childrencommon/HomeSwiper";
import HomeRecommend from "@/views/Home/childrencommon/HomeRecommend";
import GoodsList from "@/components/content/GoodsList";
import BScroll from 'better-scroll'
import store from "@/store";

import {getHomeAllDate,getHomeClassGoods} from "@/network/home";
import {onMounted, ref, reactive, computed} from "vue";

export default {
  name: "Home",
  setup() {
    const  banner = ref([]);
    const recommend = ref([]);
    const goods = reactive({
      sales:{page:1,list:[]},
      new:{page:1,list:[]},
      recommend:{page:1,list:[]},
    })
    const type = ref('sales');
    const showGoods = computed(()=>{
      return goods[type.value].list;
    })
    let bscroll = reactive({});
    onMounted(()=>{
      store.state.loading = true;
      getHomeAllDate().then(res=>{
        store.state.loading = false;
        console.log(res);
        banner.value = res.data.slides;
        recommend.value = res.data.goods.data;
      })
      getHomeClassGoods('sales').then(res=>{
        goods.sales.list = res.data.goods.data;
      })
      getHomeClassGoods('recommend').then(res=>{
        goods.recommend.list = res.data.goods.data;
      })
      getHomeClassGoods('new').then(res=>{
        goods.new.list = res.data.goods.data;
      })
      bscroll = new BScroll(document.querySelector('.wrappers'), {
        probeType: 3,
        pullUpLoad: true,
        click: true,
      });
      bscroll.on("pullingUp",()=>{
        console.log('上拉加载更多.....');
        let pages = goods[type.value].page +1;
        getHomeClassGoods(type.value,pages).then(res=>{
          goods[type.value].list.push(...res.data.goods.data);
          goods[type.value].page +=1;
        });
        bscroll.finishPullUp();
      })
    })
    function onClickTab({title,name}) {
      type.value = name;
    }
    return{
      banner,
      recommend,
      goods,
      type,
      onClickTab,
      showGoods,
    }
  },
  components: {
    HomeSwiper,
    HomeRecommend,
    GoodsList,
  },
}
</script>

<style scoped>
.home{
  height: 100vh;
}
</style>