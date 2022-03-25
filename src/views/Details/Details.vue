<template>
  <van-nav-bar title="商品详情" left-arrow @click-left="onClickLeft"/>
  <DetailsSwiper :dates="datas"></DetailsSwiper>
  <DetailsIntroduce :dates="datas"></DetailsIntroduce>
  <van-notice-bar scrollable left-icon="volume-o" :text="datas.title+'限时优惠卷兑完即止！'" />
  <van-coupon-cell
      :coupons="coupons"
      :chosen-coupon="chosenCoupon"
      @click="showList = true"
  />
  <van-popup
      v-model:show="showList"
      round
      position="bottom"
      style="height: 90%; padding-top: 4px;"
  >
    <van-coupon-list
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        :disabled-coupons="disabledCoupons"
        @change="onChange"
        @exchange="onExchange"
    />
  </van-popup>
  <van-tabs @click-tab="onClickTab" v-model:active="activeName">
    <van-tab title="概述" name="a">
      <p>{{datas.title}}这一款产品适用于18~65岁的人群，产品思维，是每一个产品人的底层能力，也是帮助他们从新手进阶到资深产品人的核心能力。 实战派产品经理、滴滴出行司机方向前产品负责人刘飞，将产品经理工作中必须要面对的认知盲点和实践痛点掰开揉碎进行讲解，毫无保留地分享了产品新人迫切需要却很难在公开渠道获取的知识。</p>
      <img src="https://oss.shop.eduwork.cn/product/2020-0820-5f3e15bc69891.png">
      <p>这是{{datas.description}}的简介</p>
      <div style="height: 50px"></div>
    </van-tab>
    <van-tab title="热评" name="b">
      <ul>
        <li>来自网友A的评价:</li>
        <li>来自网友B的评价:</li>
        <li>来自网友C的评价:</li>
        <li>来自网友D的评价:</li>
        <li>来自网友E的评价:</li>
      </ul>
    </van-tab>
    <van-tab title="相关图书" name="c">
        <GoodsList :showGoods="showGoods"></GoodsList>
        <div style="height: 40px;width: 100%"></div>
    </van-tab>
  </van-tabs>
</template>

<script>
import DetailsSwiper from "@/views/Details/childrencommon/DetailsSwiper";
import DetailsIntroduce from "@/views/Details/childrencommon/DetailsIntroduce";
import {onMounted, getCurrentInstance, ref, reactive, computed} from "vue";
import {getGoodsAboutData,getGoodsData} from "@/network/detail";
import GoodsList from "@/components/content/GoodsList";
export default {
  name: "Details",
  data() {
    return {
      id: this.$route.params.id
    }
  },
  setup() {
    const dataAll = getCurrentInstance();
    const onClickLeft = () => history.back();
    const datas = ref({});
    const caid = ref('');
    const coupon = {
      available: 1,
      condition: '无门槛\n最多优惠12元',
      reason: '',
      value: 150,
      name: '优惠券名称',
      startAt: 1489104000,
      endAt: 1514592000,
      valueDesc: '1.5',
      unitDesc: '元',
    };
    const coupons = ref([coupon]);
    const showList = ref(false);
    const chosenCoupon = ref(-1);
    const onChange = (index) => {
      showList.value = false;
      chosenCoupon.value = index;
    };
    const onExchange = (code) => {
      coupons.value.push(coupon);
    };
    const goods = reactive({
      page:1,
      list:[],
    })
    const showGoods = computed(()=>{
      return goods.list;
    })
    onMounted(()=>{
      getGoodsData(dataAll.data.id).then(res=>{
        console.log(dataAll.data.id);
        console.log(res);
        datas.value = res.data.goods;
        caid.value = datas.value.category_id
        console.log(caid.value);
      })
    })
    const onClickTab = ()=>{
      getGoodsAboutData(caid.value).then(res=>{
        goods.list = res.data.goods.data;
        console.log(res);
        console.log(goods);
      })
    }

    return {
      onClickLeft,
      datas,
      goods,
      onClickTab,
      showGoods,
      coupons,
      showList,
      onChange,
      onExchange,
      chosenCoupon,
      disabledCoupons: [coupon],
    };
  },
  components: {
    DetailsSwiper,
    DetailsIntroduce,
    GoodsList,
  },
}
</script>

<style scoped>
p:first-child{
  color: orange;
  line-height: 28px;
}
p{
  text-align: left;
  padding-left: 30px;
}
ul{
  text-align: left;
  padding: 10px 30px ;
}
ul li {
  line-height: 28px;
}
img{
  width: 100%;
}
</style>