<template>
  <van-nav-bar
      title="订单列表"
      left-arrow
      @click-left="onClickLeft"
  />
  <van-tabs v-model:active="active" @click-tab="onClickTab" title-active-color="#f05549" color="#f05549">
    <van-tab title="全部" name="all"></van-tab>
    <van-tab title="待付款" name="waitPay"></van-tab>
    <van-tab title="已支付" name="payed"></van-tab>
    <van-tab title="发货" name="deliver"></van-tab>
    <van-tab title="交易完成" name="complete"></van-tab>
    <van-tab title="已过期" name="overdue"></van-tab>
  </van-tabs>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
    >
      <van-cell v-for="item in showGoods" :key="item" @click="goDetail(item.orderDetails.data[0].order_id)">
        <div class="orders" v-show="item.goods.data.length>0">
          <h5>订单号：{{item.order_no}}</h5>
          <h5>创建时间：{{item.created_at}}</h5>
        </div>
        <van-card
            :num="item.orderDetails.data[indexs].num"
            :price="items.price"
            :desc="items.description"
            :title="items.title"
            :thumb="items.cover_url"
            v-for="(items,indexs) in item.goods.data"
            :key="items.id"
        />
      </van-cell>
    </van-list>
  </van-pull-refresh>
</template>

<script>
import {computed, reactive, ref, onMounted} from "vue";
import {queryOrderList,queryOrderAllList} from "@/network/order";
import {useRouter} from "vue-router";
import { Toast } from 'vant';export default {
  name: "OrderList",
  setup(){
    const onClickLeft = () => history.back();
    const list = ref([]);
    const active = ref(0);
    const loading = ref(false);
    const finished = ref(false);
    const refreshing = ref(false);
    const goods = reactive({
      all: {page:1,datas:[]},
      waitPay: {page:1,datas:[]},
      payed: {page:1,datas:[]},
      deliver: {page:1,datas:[]},
      complete: {page:1,datas:[]},
      overdue: {page:1,datas:[]},
      // waitPay:{data:[]},
      // payed:{data:[]},
      // deliver:{data:[]},
      // complete:{data:[]},
      // overdue:{data:[]},
    })
    const type = ref('all');
    const showGoods = computed(()=>{
      return goods[type.value].datas;
    })
    onMounted(()=>{
      queryOrderAllList().then(res=>{
        goods.all.datas = res.data.data
      })
      queryOrderList(1).then(res=>{
        console.log(res);
        goods.waitPay.datas = res.data.data
      })
      queryOrderList(2).then(res=>{
        console.log(res);
        goods.payed.datas = res.data.data
      })
      queryOrderList(3).then(res=>{
        console.log(res);
        goods.deliver.datas = res.data.data
      })
      queryOrderList(4).then(res=>{
        console.log(res);
        goods.complete.datas = res.data.data
      })
      queryOrderList(5).then(res=>{
        console.log(res);
        goods.overdue.datas = res.data.data
      })
    })
    const onLoad = () => {
      loading.value = true;
      let pages = goods[type.value].page+1;
      queryOrderAllList(pages).then(res=>{
        goods[type.value].datas.push(...res.data.data);
        goods[type.value].page+=1;
        // 加载状态结束
        loading.value = false;
        // 数据全部加载完成
        if (res.data.data.length<=0) {
          finished.value = true;
        }
      })
      queryOrderList(1,pages).then(res=>{
        goods[type.value].datas.push(...res.data.data);
        goods[type.value].page+=1;
        // 加载状态结束
        loading.value = false;
        // 数据全部加载完成
        if (res.data.data.length<=0) {
          finished.value = true;
        }
      })

    }
    const onRefresh = () => {
      setTimeout(() => {
        refreshing.value = false;
        Toast.success('刷新成功')
      }, 1000);
    };
    function onClickTab({title,name}) {
      type.value = name;
      console.log(type.value);
    }
    const router = useRouter();
    const goDetail = (id)=>{
      router.push({name:'orderdetail',query:{id}})
    }
    return{
      onClickLeft,
      showGoods,
      onClickTab,
      refreshing,
      list,
      loading,
      finished,
      active,
      onLoad,
      goDetail,
      onRefresh,
    }
  }
}
</script>

<style scoped>
.van-card{
  margin: 20px;
  text-align: left;
}
.orders{
  margin: 20px;
  text-align: left;
  background: #f7f8fa;
  padding: 10px;
  border-radius: 5px;
}
h5{
  margin: 5px;
  font-weight: 400;
}
</style>