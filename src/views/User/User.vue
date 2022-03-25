<template>
  <van-nav-bar
      title="我的"
      left-arrow
      @click-left="onClickLeft"
      :border="false"
  />
  <div class="infos">
    <van-row>
      <van-col span="24">
        <van-image
            round
            width="10rem"
            height="10rem"
            :src="datas.avatar_url"
        />
        <div class="coc_child">
          <h5>用户名:{{datas.name}}</h5>
          <h5>登录邮箱:{{datas.email}}</h5>
          <h5>个性签名:@123456.</h5>
        </div>
      </van-col>
    </van-row>
    <div class="info">
      <van-cell title="我的收藏" to="/collect" is-link />
      <van-cell title="我的订单" to="/orderlist" is-link />
      <van-cell title="账号管理" to="/account" is-link />
      <van-cell title="地址管理" to="/address" is-link />
      <van-cell title="关于我们" to="/about" is-link />
      <van-button class="logout" type="danger" @click="logout" block round>退出登录</van-button>
    </div>
  </div>
</template>

<script>
import {Logout,getUserDates} from "@/network/user";
import {Toast} from "vant";
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import store from "@/store";

export default {
  name: "User",
  setup() {
    const onClickLeft = () => history.back();
    const route = useRouter();
    const logout = ()=>{
      Logout().then(res=>{
        if(res.status===204){
          window.localStorage.setItem('token','')
          Toast.success('退出成功!');
          route.push({name:'signIn'})
        }
      })
    }
    const datas = ref({});
    onMounted(()=>{
      store.state.loading = true;
      getUserDates().then(res=>{
        store.state.loading = false;
        console.log(res);
        datas.value = res.data;
      })
    })
    return {
      onClickLeft,
      logout,
      datas,
    };
  },
}
</script>

<style scoped>
.infos{
  background: #f05549;
}
.info{
  padding-top: 20px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  background: white;
}
.van-cell{
  text-align: left;
}
.van-image{
  margin: 20px;
  width: 70px !important;
  height: 70px !important;
  float: left;
}
.van-col {
  background: #f05549;
  color: white;
  padding: 10px 0;
  overflow: hidden;
}
.coc_child{
  float: left;
  padding-top: 25px;
}
.coc_child h5{
  margin: 0;
  line-height: 24px;
  text-align: left;
}
.logout{
  margin-top: 10px;
}
</style>