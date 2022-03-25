<template>
  <van-card
      :num="dates.stock"
      :price="dates.price"
      :desc="dates.description"
      :title="dates.title"
  >
    <template #tags>
      <van-tag class="tag" plain type="danger">新书</van-tag>
      <van-tag class="tag" plain type="danger">流行</van-tag>
    </template>
    <template #footer class="but">
      <van-button class="star" v-show="!checked" size="mini" @click="starts(dates.id)">收藏</van-button>
      <van-button class="star stars" v-show="checked" size="mini" @click="starts(dates.id)" to="#">已收藏</van-button>
      <van-button class="join" size="mini" @click="addcat(dates.id)">加入购物车</van-button>
      <van-button class="buy" size="mini" @click="buy(dates.id)">立即购买</van-button>
    </template>
  </van-card>
</template>

<script>
import {AddCarts, addstarts, getUserCollects} from "@/network/detail";
import {useRouter} from "vue-router";
import {ref,onMounted} from "vue";
import {Toast} from "vant";
import store from "@/store";
export default {
  name: "DetailsIntroduce",
  props: {
    dates:{
      type: Object,
      default() {
        return [];
      }
    }
  },
  setup(props){
    const router = useRouter();
    const checked = ref(false);
    const dataId = ref([]);
    onMounted(()=>{
      store.state.loading = true;
      getUserCollects().then(res=>{
        store.state.loading = false;
        console.log(res);
        dataId.value = res.data.data.map((item)=>item.goods_id);
        if(dataId.value.indexOf(props.dates.id)===-1){
          checked.value = false
        }else {
          console.log(dataId.value.indexOf(props.dates.id));
          checked.value = true
        }
      })
    })
    const starts = (id)=>{
      store.state.loading = true;
      addstarts(id).then(res=>{
        store.state.loading = false;
        console.log(res);
        if(res.status===201){
          Toast.success('收藏成功')
        }else {
          Toast.fail('取消收藏')
        }
        //刷新页面
        setTimeout(location.reload(),3000)
      })
    }
    const addcat = (id)=>{
      AddCarts(id).then(res=>{
        console.log(res);
        store.dispatch('upCarNum');
      })
    }
    const buy = (id)=>{
      AddCarts(id).then(res=>{
        console.log(res);
        store.dispatch('upCarNum');
        router.push({name:'cart'})
      })
    }
    return{
      addcat,
      starts,
      buy,
      checked,
    }
  }
}
</script>

<style scoped>
.van-card{
  text-align: left !important;
  line-height: 24px;
}
.van-card div{
}
.tag{
  color: red;
  font-size: 12px;
  border: 1px solid red;
  padding: 1px;
  margin: 2px;
}
.join{
  background: orange;
  margin-right: 3px;
}
.buy{
  background: red;
}
.join,.buy,.star{
  padding: 15px 10px;
  color: white;
}
.star{
  color: red;
}
.stars{
  background: red;
  color: white;
}
</style>