<template>
  <van-nav-bar
      title="订单详情"
      left-arrow
      @click-left="onClickLeft"
  />
  <div class="order">
    <h5>订单状态：{{datas.order.status}}</h5>
    <h5>订单编号：{{datas.order.order_no}}</h5>
    <h5>下单时间：{{datas.order.created_at}}</h5>
    <van-button type="primary" block>去支付</van-button>
  </div>
  <div style="height: 20px;background: #f1f1f1;margin-left: 20px;margin-right: 20px"></div>
  <div class="order">
    <h5>商品金额：￥{{total}}.00</h5>
    <h5>配送方式：{{type}}</h5>
  </div>
  <van-card
      :num="datas.orderDetails[index].num"
      :price="item.price"
      :desc="item.description"
      :title="item.title"
      :thumb="item.cover_url"
      v-for="(item,index) in datas.goods"
      :key="item.id"
  />
</template>

<script>
import {queryOrderDetail} from "@/network/order";
import {onMounted,ref} from "vue";
import {useRoute} from "vue-router";
export default {
  name: "OrderDetail",
  setup(){
    const onClickLeft = () => history.back();
    const route = useRoute();
    const total = ref(0);
    const type = ref('');
    const datas = ref({
      order:{},
      goods:[],
      orderDetails:[]
    })
    onMounted(()=>{
      queryOrderDetail(route.query.id).then(res=>{
        console.log(res);
        datas.value.order = res.data
        datas.value.goods = res.data.goods.data
        datas.value.orderDetails = res.data.orderDetails.data
        total.value = datas.value.orderDetails.map(item=>item.num*item.price).reduce((a,b)=>a+=b)
        if(res.data.express_type!==null){
          type.value = res.data.express_type
        }else {
          type.value = '邮政快递(默认)'
        }
      })
    })
    return{
      onClickLeft,
      datas,
      total,
      type,
    }
  }
}
</script>

<style scoped>
.order{
  padding: 20px;
  text-align: left;
}
h5{
  margin: 5px;
  font-weight: 400;
}
.van-card{
  margin-left: 20px;
  margin-right: 20px;
  text-align: left;
}
</style>