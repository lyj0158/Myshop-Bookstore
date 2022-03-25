<template>
  <van-nav-bar title="用户注册" left-arrow @click-left="onClickLeft"/>
  <van-row>
    <van-col span="24">
      <img src="../../assets/images/register.png" alt="注册">
    </van-col>
  </van-row>
  <van-form @submit="sendData">
    <van-cell-group inset>
      <!-- 通过 pattern 进行正则校验 -->
      <van-field
          v-model="name"
          name="name"
          label="用户名"
          placeholder="请填写用户名"
          :rules="[{ names, required: true, message: '用户名以字母，数字，下划线，减号组成' }]"
      />
      <!-- 通过 validator 进行函数校验 -->
      <van-field
          v-model="password"
          name="password"
          label="密码"
          type="password"
          placeholder="请填写密码"
          :rules="[{ passwords, required: true, message: '密码最少为6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符' }]"
      />
      <!-- 通过 validator 返回错误提示 -->
      <van-field
          v-model="password_confirmation"
          name="password_confirmation"
          label="确认密码"
          type="password"
          placeholder="请确认密码"
          :rules="[{ required: true, message: '请再次确认密码' }]"
      />
      <!-- 通过 validator 进行异步函数校验 -->
      <van-field
          v-model="email"
          name="email"
          label="电子邮箱"
          placeholder="请填写邮箱"
          :rules="[{ emails, required: true, message: '请填写有效的邮箱' }]"
      />
      </van-cell-group>
    <div class="overs">
      <router-link to="/signIn" class="tabLogin">已有账号，立即登录</router-link>
      <van-button color="#f05549" round block type="primary" native-type="submit">
        注册
      </van-button>
    </div>
  </van-form>
</template>

<script>
import {reactive, toRefs} from "vue";
import {PostRegister} from "@/network/user";
import { Toast } from 'vant';
import {useRouter} from "vue-router";

export default {
  name: "UserRegister",
  setup() {
    const onClickLeft = () => history.back();
    const data = reactive({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    })
    const names = /^[a-zA-Z0-9_-]{4,16}$/;
    const passwords = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
    const emails = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    const route = useRouter();
    console.log(route);
    const sendData = ()=>{
      if(data.password !== data.password_confirmation){
        Toast.fail('两次密码输入不一致!');
      }else {
        PostRegister(data).then(res=>{
          console.log(res);
          if(res.status === 201){
            Toast.success('注册成功!');
            setTimeout(() => {
              route.push({name:'signIn'})
            }, 1000);
          }
        })
      }
    }
    return {
      ...toRefs(data),
      names,
      passwords,
      emails,
      sendData,
      route,
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