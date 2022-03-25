<template>
  <van-nav-bar title="购物车" left-arrow @click-left="onClickLeft"/>
  <van-checkbox-group v-model="checked" @change="selectCart" ref="checkboxGroup">
    <div v-show="goodList.length<1" style="margin: 20px">购物车空空如也，先去添加吧！</div>
    <van-swipe-cell v-for="item in goodList" :key="item.id">
    <van-checkbox :name="item.id" class="left_checked" />
    <div class="left_goods">
      <van-card
          :num="item.goods.stock"
          :price="item.goods.price"
          :desc="item.goods.description"
          :title="item.goods.title"
          :class="goods-card"
          :thumb="item.goods.cover_url"
      >
        <template #footer>
          <van-stepper integer :min="1" :max="item.goods.stock" async-change :name="item.id" v-model="item.num" @change="upNum"/>
        </template>
      </van-card>
    </div>
    <template #right>
      <van-button @click="move(item.id)" square text="删除" type="danger" class="delete-button" />
    </template>
  </van-swipe-cell>
  <div style="height:50px"></div>
  <van-submit-bar :price="total*100" button-text="提交订单" @submit="onSubmit">
    <van-checkbox v-model="selectAll" @click="toggleAll">全选</van-checkbox>
  </van-submit-bar>
  </van-checkbox-group>
</template>

<script>
import { Toast } from 'vant';
import {useStore} from 'vuex';
import {computed, onMounted, ref} from "vue";
import { Dialog } from 'vant';
import {useRouter} from "vue-router";
import {getCartList,MoveCartList,UpCartList,SelectCarList} from "@/network/detail";

export default {
  name: "Cart",
  setup() {
    const onClickLeft = () => history.back();
    const router = useRouter();
    const onSubmit = () => {
      router.push({name:'order'})
    }
    const value = ref(1);
    const goodList = ref([])
    const store = useStore();
    const checked = ref([]);
    //获取复选框的节点
    const checkboxGroup = ref(null);
    //设置全选复选框的初始状态
    const selectAll = ref(false);
    const init = ()=>{
      getCartList('include=goods').then(res=>{
        console.log(res);
        goodList.value = res.data.data;
        console.log(goodList.value.length);
        console.log(checked.value.length);
        checked.value = res.data.data.filter(item=>item.is_checked===1).map(item=>item.id);
      })
    }
    onMounted(()=>{
      init();
    })
    const move = (id)=>{
      Dialog.confirm({
        title: '确认删除',
        message:
            '你确认要将此商品移出购物车吗？',
      })
          .then(() => {
            MoveCartList(id).then(res=>{
              if(res.status===204){
                init();
                store.dispatch('upCarNum')
                Toast.success('移出成功!')
              }
            })
          })
          .catch(() => {
          });
    }
    const upNum = (value,detail)=>{
      UpCartList(detail.name,value).then(res=>{
      })
    }
    const total = computed(()=>{
      return goodList.value.filter(item=>checked.value.includes(item.id)).reduce((a,b)=>a+=(b.num*b.goods.price),0);
    })
    const selectCart = (names)=>{
      store.state.loading = true;
      SelectCarList({cart_ids: names}).then(res=>{
        store.state.loading = false;
        if(checked.value.length===goodList.value.length){
          selectAll.value = true
        }else {
          selectAll.value = false
        }
      })
    }
    const toggleAll = () => {
      checked.value.length===goodList.value.length?checkboxGroup.value.toggleAll():checkboxGroup.value.toggleAll(true);
    }
    return {
      toggleAll,
      checkboxGroup,
      selectAll,
      total,
      upNum,
      selectCart,
      onClickLeft,
      onSubmit,
      checked,
      value,
      goodList,
      move,
    };
  },
}
</script>

<style scoped>
.van-card{
  text-align: left;
}
.van-submit-bar{
  bottom: 50px !important;
}
.left_checked{
  padding-left: 20px;
  background: #f7f8fa;
  flex: 1;
}
.left_goods{
  flex: 9;
}
.van-button--danger{
  border: none;
  height: 100%;
}
</style>