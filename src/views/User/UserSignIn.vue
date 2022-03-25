<template>
  <van-nav-bar title="用户登录" left-arrow @click-left="onClickLeft"/>
  <van-row>
    <van-col span="24">
      <img src="../../assets/images/register.png" alt="注册">
    </van-col>
  </van-row>
  <van-form @submit="sendData">
    <van-cell-group inset>
      <!-- 通过 pattern 进行正则校验 -->
      <van-field
          v-model="email"
          name="email"
          label="用户名"
          placeholder="请输入邮箱"
          :rules="[{ required: true, message: '请使用邮箱登录' }]"
      />
      <!-- 通过 validator 进行函数校验 -->
      <van-field
          v-model="password"
          name="password"
          label="密码"
          type="password"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请输入密码' }]"
      />
    </van-cell-group>
    <div class="overs">
      <router-link to="/register" class="tabLogin">立即注册</router-link>
      <van-button color="#f05549" round block type="primary" native-type="submit">
        登录
      </van-button>
    </div>
  </van-form>
</template>

<script>

import {reactive, toRefs} from "vue";
import {PostLogin} from "@/network/user";
import { Toast } from 'vant';
import {useRouter} from "vue-router";

export default {
  name: "UserSignIn",
  setup() {
    const onClickLeft = () => history.back();
    const data = reactive({
      email: '',
      password: '',
    })
    const route = useRouter();
    const sendData = (data)=>{
      PostLogin(data).then(res=>{
        window.localStorage.setItem('token',res.data.access_token);
        if(res.status === 200){
          Toast.success('登录成功!');
          route.push({name:'user'})
        }
      })
    }
    return {
      ...toRefs(data),
      sendData,
      onClickLeft,
    };
  },
}
</script>

<style scoped>
img{
  margin: 20px 0;
}
.overs{
  margin: 16px;
  text-align: left;
}
.tabLogin{
  margin-left: 10px;
  display: inline-block;
  margin-bottom: 10px;
  font-size: 14px;
  color: dodgerblue;
}
</style>