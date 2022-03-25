<template>
  <van-nav-bar
      title="账号管理"
      left-arrow
      @click-left="onClickLeft"
  />
  <div class="head_portrait">
    <img :src="datas.avatar_url" style="display: block;margin: 10px auto;">
    <van-button round type="primary" @click="upHead"> 更换头像 </van-button>
    <van-dialog v-model:show="showHead" title="更换头像" show-cancel-button @confirm="confirmUp">
      <van-uploader v-model="fileList" multiple />
    </van-dialog>
  </div>
  <van-cell title="用户名" is-link @click="changeShowName" :value="datas.name" />
  <van-dialog v-model:show="showName" title="更换用户名" show-cancel-button @confirm="confirmName">
    <van-cell-group inset>
      <van-field v-model="names" label="新用户名" placeholder="请输入新的用户名" />
    </van-cell-group>
  </van-dialog>
  <van-cell title="邮箱" is-link @click="changeShowEmail" :value="datas.email" />
  <van-dialog v-model:show="showEmail" title="绑定邮箱" show-cancel-button @confirm="confirmEmail">
    <van-cell-group inset>
      <van-field v-model="Email" label="更换邮箱" placeholder="请输入邮箱" />
      <van-field
          v-model="EmailVerification"
          center
          clearable
          label="邮箱验证码"
          placeholder="验证码"
      >
        <template #button>
          <van-button size="small" type="primary" @click="sentEmailVerification">发送验证码</van-button>
        </template>
      </van-field>
    </van-cell-group>
  </van-dialog>
  <van-cell title="绑定手机号" is-link @click="changeShowPhone" :value="datas.phone" />
  <van-dialog v-model:show="showPhone" title="绑定手机号" show-cancel-button @confirm="confirmPhone">
    <van-cell-group inset>
      <van-field v-model="Phone" label="绑定手机号" placeholder="请输入手机号" />
      <van-field
          v-model="PhoneVerification"
          center
          clearable
          label="短信验证码"
          placeholder="验证码"
      >
        <template #button>
          <van-button size="small" type="primary" @click="sentPhoneVerification">发送验证码</van-button>
        </template>
      </van-field>
    </van-cell-group>
  </van-dialog>
  <van-dialog />
  <van-field v-model="password" type="password" label="密码" readonly @click="changeShowPwd"/>
  <van-dialog v-model:show="showPwd" title="更换密码" show-cancel-button @confirm="confirmPwd">
    <van-cell-group inset>
      <van-field v-model="oldPwd" label="旧密码" type="password" placeholder="请输入旧密码" />
      <van-field v-model="newPwd" label="新密码" type="password" placeholder="请输入新密码" />
      <van-field v-model="newsPwd" label="确认新密码" type="password" placeholder="再次输入新密码" />
    </van-cell-group>
  </van-dialog>
  <van-cell title=" 忘记密码？" is-link @click="retrievePwd"/>
  <van-dialog v-model:show="showRetrieve" title="找回密码" show-cancel-button @confirm="confirmRetrieve">
    <van-cell-group inset>
      <van-field v-model="Email" label="绑定邮箱" placeholder="请输入邮箱" />
      <van-field
          v-model="EmailVerification"
          center
          clearable
          label="邮箱验证码"
          placeholder="验证码"
      >
        <template #button>
          <van-button size="small" type="primary" @click="sentEmailVerification">发送验证码</van-button>
        </template>
      </van-field>
      <van-field v-model="newPwd" label="新密码" type="password" placeholder="请输入新密码" />
      <van-field v-model="newsPwd" label="确认新密码" type="password" placeholder="再次输入新密码" />
    </van-cell-group>
  </van-dialog>
</template>

<script>
import {onMounted, ref, watch} from "vue";
import {
  getUserDates,
  getOssToken,
  changeUserName,
  changeHead,
  changePwd,BindPhone,
  getPhoneVerification,
  getEmailVerification,
  BindEmail,Retrieve
} from "@/network/user";
import { Dialog } from 'vant';
export default {
  name: "UserAccount ",
  setup(){
    const onClickLeft = () => history.back();
    const datas = ref({});
    const showHead = ref(false);
    const showName =ref(false);
    const showPhone =ref(false);
    const showEmail =ref(false);
    const showPwd =ref(false);
    const showRetrieve =ref(false);
    const names = ref('');
    const Phone = ref('');
    const Email = ref('');
    const oldPwd = ref('');
    const newPwd = ref('');
    const newsPwd = ref('');
    const password = ref(123456);
    const PhoneVerification = ref('');
    const EmailVerification = ref('');
    const fileList = ref([]);
    const ossTokens = ref('');

    onMounted(()=>{
      getUserDates().then(res=>{
        console.log(res);
        datas.value = res.data;
      })
    })
    watch(datas.name,()=>{

    })
    const upHead = ()=>{
      showHead.value = true;
      getOssToken().then(res=>{
        console.log(res);
        ossTokens.value = res.callback;

      })
    }
    const confirmUp = ()=>{
      console.log("打印");
      changeHead(ossTokens.value).then(res=>{
        console.log(res);
      })
    }
    const changeShowName = () =>{
      showName.value = true;
    }
    const changeShowPhone = ()=>{
      showPhone.value = true;
    }
    const changeShowEmail = ()=>{
      showEmail.value = true;
    }
    const changeShowPwd = ()=>{
      showPwd.value = true;
    }
    const retrievePwd = ()=>{
      showRetrieve.value = true;
    }
    const confirmName = ()=>{
      changeUserName(names.value).then(res=>{
        console.log(res);
      })
    }
    const confirmPhone = ()=>{
      BindPhone(PhoneVerification.value,Phone.value).then(res=>{
        console.log(res);
      })
    }
    const confirmEmail = ()=>{
      BindEmail(EmailVerification.value,Email.value).then(res=>{
        console.log(res);
      })
    }
    const confirmPwd = ()=>{
      changePwd(oldPwd.value,newPwd.value,newsPwd.value).then(res=>{
        console.log(res);
      })
    }
    const confirmRetrieve = ()=>{
      Retrieve(EmailVerification.value,Email.value,newPwd.value,newsPwd.value).then(res=>{
        console.log(res);
      })
    }
    const VanDialog = Dialog.Component;
    const sentPhoneVerification = ()=>{
      getPhoneVerification(Phone.value).then(res=>{
        console.log(res);
      })
    }
    const sentEmailVerification = ()=>{
      getEmailVerification(Email.value).then(res=>{
        console.log(res);
      })
    }
    return {
      onClickLeft,
      datas,
      VanDialog,
      showHead,
      showName,
      showPhone,
      showEmail,
      showPwd,
      showRetrieve,
      upHead,
      fileList,
      confirmUp,
      confirmName,
      confirmPhone,
      confirmEmail,
      confirmPwd,
      confirmRetrieve,
      names,
      Phone,
      Email,
      oldPwd,
      newPwd,
      newsPwd,
      password,
      PhoneVerification,
      EmailVerification,
      changeShowName,
      changeShowPhone,
      changeShowEmail,
      changeShowPwd,
      retrievePwd,
      sentPhoneVerification,
      sentEmailVerification,
    }
  }
}
</script>

<style scoped>
.head_portrait{
  text-align: center;
  padding: 10px 0;
}
.head_portrait img{
  margin: 10px 0;
  width: 100px;
  height: auto;
}
h5{
  margin: 0;
}
.van-cell{
  text-align: left;
}
</style>