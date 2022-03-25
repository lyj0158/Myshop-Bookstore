<template>
  <van-nav-bar
      title="生成订单"
      left-arrow
      @click-left="onClickLeft"
  />
  <div class="address_datas" @click="onEdit" v-show="addressLength===0">
    <div>
      <h5>暂无地址信息，点击前往添加</h5>
    </div>
    <img src="../../../assets/images/go.png" style="width: 20px;height: 20px">
  </div>
  <div class="address_datas" @click="onEdit" v-show="addressLength===1">
    <div>
      <h5>{{address.name}}</h5>
      <h5>{{address.province+address.city+address.county}}</h5>
    </div>
    <img src="../../../assets/images/go.png" style="width: 20px;height: 20px">
  </div>
  <div v-show="goods.length<1&&addressLength>1" style="margin: 20px">暂无订单哦，先去添加购物车吧！</div>
  <div v-show="addressLength===0" style="margin: 20px">请先选择地址信息！</div>
  <van-swipe-cell v-for="item in goods" :key="item.id">
    <van-card
        :num="item.num"
        :price="item.goods.price"
        :title="item.goods.title"
        class="goods-card"
        :thumb="item.goods.cover_url"
    />
    <template #right>
      <van-button square text="删除" type="danger" class="delete-button" />
    </template>
  </van-swipe-cell>
  <van-submit-bar :price="total*100" button-text="生成订单" @submit="onSubmit" />
  <van-overlay :show="show" @click="show = false">
    <div v-show="show" class="order_wrapper">
      <div class="block">
        <van-radio-group v-model="paytype" direction="horizontal">
          <van-radio name="1">支付宝</van-radio>
          <van-radio name="2">微信</van-radio>
        </van-radio-group>
        <img :src="payQrCode_url"/>
      </div>
    </div>
  </van-overlay>
</template>

<script>
import {useStore} from 'vuex';
import {ref, onMounted, reactive, toRefs, computed} from 'vue';
import { Toast } from 'vant';
import {previewOrder,SubmitOrder,PayCode,PayStatus} from "@/network/order";
import {useRouter} from "vue-router";
import store from "@/store";
export default {
  name: "UserOrder",
  setup(){
    const datas = reactive({
      address:{},
      goods:[],
    })
    const onClickLeft = () => history.back();
    const router = useRouter();
    const paytype = ref('1');
    const store = useStore();
    const show = ref(false);
    const payQrCode_url = ref('');
    const addressLength = ref(0);
    const onEdit = () => {
      router.push({name:'address',query:{type:'addOrder'}})
    }
    const onSubmit = () => {
      SubmitOrder(datas.address.id).then(res=>{
        console.log(res);
        if(res.data.id>=0){
          show.value = true
          store.dispatch('upCarNum')
          PayCode(res.data.id,'aliyun').then(res=>{
            payQrCode_url.value = res.data.qr_code_url;
          })
          //轮询查看支付状态
          let serch = setInterval(()=>{
            PayStatus(res.data.id).then(res=>{
              console.log(res);
              if(res.data===1){
                router.push({name:'orderlist'})
                clearInterval(serch);
              }
            })
          },1000)
        }
      }).catch(err=>{
        Toast.fail('订单创建失败');
        router.push({name:'orderlist'})
      })
    }
    const total = computed(()=>{
      return datas.goods.reduce((a,b)=>a+=(b.num*b.goods.price),0);
    })
    onMounted(()=>{
      store.state.loading = true;
      previewOrder().then(res=>{
        store.state.loading = false;
        console.log(res);
        if(res.data.address.length<1){
          addressLength.value = 0;
        }else {
          addressLength.value = 1;
          datas.goods = res.data.carts
          datas.address = res.data.address.filter(item=>item.is_default==1).map(item=>{
            return{
              address: item.address,
              city: item.city,
              county: item.county,
              id: item.id,
              name: item.name,
              phone: item.phone,
              province: item.province,
            }
          })[0];
        }
      })
    })
    return {
      ...toRefs(datas),
      onClickLeft,
      onEdit,
      onSubmit,
      total,
      show,
      paytype,
      payQrCode_url,
      addressLength,
    };
  }
}
</script>

<style scoped>
.van-swipe-cell{
  display: flex;
}
.van-card{
  width: 375.2px;
  text-align: left;
}
.goods-card {
  margin: 0;
  background-color: white;
}

.delete-button {
  height: 100%;
  border: none;
}
.van-submit-bar{
  bottom: 50px;
}
.address_datas{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 20px;
  justify-content: space-between;
  border-bottom: 2px transparent dashed;
  border-image:linear-gradient(to right,#90F7EC,#32CCBC) 1 10;
}
h5{
  text-align: left;
  margin: 5px;
}
.van-radio-group{
  display: flex;
  align-items: center;
  justify-content: center;
}
.order_wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.block {
  width: 200px;
  height: 220px;
  background-color: #fff;
}
</style>