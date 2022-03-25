<template>
  <van-nav-bar
      title="我的收藏"
      left-arrow
      @click-left="onClickLeft"
  />
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
    >
      <van-card
          tag="流行"
          :price="item.goods.price"
          :desc="item.goods.description"
          :title="item.goods.title"
          :thumb="item.goods.cover_url"
          :origin-price="item.goods.price+10"
          v-for="item in datas.data"
          :key="item.goods.id"
          @click="goGoods(item.goods.id)"
      />
    </van-list>
  </van-pull-refresh>
</template>

<script>
import {ref,onMounted} from "vue";
import {getUserCollects} from "@/network/detail";
import {useRouter} from "vue-router";
export default {
  name: "UserCollect",
  setup(){
    const onClickLeft = () => history.back();
    const list = ref([]);
    const loading = ref(false);
    const finished = ref(false);
    const refreshing = ref(false);
    const datas = ref([]);
    onMounted(()=>{
      getUserCollects().then(res=>{
        datas.value = res.data
        console.log(datas.value);
      })
    })
    const onLoad = () => {
      setTimeout(() => {
        if (refreshing.value) {
          list.value = [];
          refreshing.value = false;
        }
        for (let i = 0; i < 10; i++) {
          list.value.push(list.value.length + 1);
        }
        loading.value = false;
        if (list.value.length >= 40) {
          finished.value = true;
        }
      }, 1000);
    };
    const onRefresh = () => {
      // 清空列表数据
      finished.value = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      loading.value = true;
      onLoad();
    };
    const route = useRouter();
    const goGoods = (id) =>{
      route.push({name:'details',params:{id}})
    }
    return {
      onClickLeft,
      onLoad,
      loading,
      finished,
      onRefresh,
      refreshing,
      datas,
      goGoods,
    }
  }
}
</script>

<style scoped>
.van-card{
  text-align: left;
}
</style>