<template>
  <van-nav-bar title="分类" left-arrow @click-left="onClickLeft"/>
  <van-row>
    <van-col span="8">
      <van-collapse v-model="activeNames" accordion>
        <van-collapse-item :title="item.name" :name="item.id" v-for="item in categories" :key="item.id">
          <van-sidebar v-model="active">
            <van-sidebar-item :title="son.name" v-for="son in item.children.slice(0,4)" :key="son.id" @click="getGoods(son.id)"/>
          </van-sidebar>
        </van-collapse-item>
      </van-collapse>
    </van-col>
    <van-col span="16">
      <van-tabs @click-tab="onClickTab">
        <van-tab title="销量排序" name="sales"></van-tab>
        <van-tab title="价格排序" name="price"></van-tab>
        <van-tab title="评论排序" name="comments_count"></van-tab>
        <div class="goods-list">
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
                :loading="loading"
                :finished="finished"
                finished-text="没有更多了"
                error-text="请求数据失败，请刷新重试！"
                offset="100"
                @load="onLoad"
            >
              <van-card
                  :num="item.sales+20"
                  tag="流行"
                  :price="item.price"
                  :title="item.title"
                  :thumb="item.cover_url"
                  :origin-price="item.price+20"
                  v-for="item in showGoods"
                  :key="item.id"
                  @click="goGoods(item.id)"
              />
            </van-list>
          </van-pull-refresh>
        </div>
        <van-empty description="此类商品已售空" v-if="showGoods.length<=0"/>
      </van-tabs>
    </van-col>
  </van-row>
</template>

<script>
import {ref, onMounted, reactive, computed} from "vue";
import {getCategoriesList, getGoodsList} from "@/network/goods";
import {useRouter} from 'vue-router';
import store from "@/store";
export default {
  name: "Categories",
  setup() {
    const onClickLeft = () => history.back();
    const activeNames = ref('1');
    const activeName = ref('a');
    const categories = ref([]);
    const active = ref(0);
    const cids = ref(0);
    const sort = ref('sales');
    const refreshing = ref(false);
    const goods = reactive({
      sales:{page:1,list:[]},
      price:{page:1,list:[]},
      comments_count:{page:1,list:[]},
    });
    const showGoods = computed(()=>{
      return goods[sort.value].list;
    })
    const getDatas = ()=>{
      store.state.loading = true;
      getGoodsList(cids.value,'sales').then(res=>{
        store.state.loading = false;
        goods.sales.list = res.data.goods.data;
      })
      getGoodsList(cids.value,'price').then(res=>{
        store.state.loading = false;
        goods.price.list = res.data.goods.data;
      })
      getGoodsList(cids.value,'comments_count').then(res=>{
        store.state.loading = false;
        goods.comments_count.list = res.data.goods.data;
      })
    }
    onMounted(()=>{
      store.state.loading = true;
      getCategoriesList().then(res=>{
        store.state.loading = false;
        categories.value = res.data.categories;
      })
      getDatas();
    })
    const onClickTab = ({name})=>{
      sort.value = name;
    }
    function getGoods(cid){
      cids.value = cid;
      getDatas();
    }
    const loading = ref(false);
    const finished = ref(false);
    const onLoad = () => {
      loading.value = true;
      let pages = goods[sort.value].page+1;
      getGoodsList(cids.value,sort.value,pages).then(res=>{
        goods[sort.value].list.push(...res.data.goods.data);
        goods[sort.value].page+=1;
        // 加载状态结束
        loading.value = false;
        // 数据全部加载完成
        if (res.data.goods.data.length<=0) {
          finished.value = true;
        }
      })

    }
    const onRefresh = () => {
      setTimeout(() => {
        refreshing.value = false;
      }, 1000);
    };
    const route = useRouter();
    const goGoods = (id) =>{
      route.push({name:'details',params:{id}})
    }
    return {
      onClickLeft,
      goGoods,
      activeNames,
      activeName,
      categories,
      active,
      goods,
      getGoods,
      onClickTab,
      showGoods,
      finished,
      loading,
      onLoad,
      refreshing,
      onRefresh
    };
  },
}
</script>

<style scoped>
.van-card{
  text-align: left;
}
</style>