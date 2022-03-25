<template>
  <van-nav-bar
      title="地址管理"
      left-arrow
      @click-left="onClickLeft"
  />
  <div v-show="list.length==0" style="margin-top: 200px;text-align: center">
    还没有添加地址信息，请先添加！
  </div>
  <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      :switchable="switchable"
      @add="onAdd"
      @edit="onEdit"
      @select="switchAddress"
  />
</template>

<script>
import {onMounted} from "vue";
import {useRouter,useRoute} from "vue-router";
import { ref } from 'vue';
import { Toast } from 'vant';
import {getAddressList} from "@/network/address";
import {SetDefaultAddressListInfo} from "@/network/address";
export default {
  name: "UserAddress",
  setup(){
    const onClickLeft = () => history.back();
    const chosenAddressId = ref(0);
    const router = useRouter();
    const route =useRoute();
    const onAdd = () => {
      Toast('新增地址');
      router.push({name:'addaddress',query:{type:'add'}})
    }
    const onEdit = (item, index) => {
      router.push({name: 'addaddress',query:{type:'edit',id:item.id}})
    };
    const switchable = ref(false)
    const list = ref([])
    onMounted(()=>{
      //判断是否显示选择框
      if(route.query.type==='addOrder'){
        switchable.value = true;
      }
      getAddressList().then(res=>{
        console.log(res);
        list.value = res.data.data.map(item=>{
          //设置默认地址的选中
          if (item.is_default===1){
            chosenAddressId.value =item.id;
          }
          return{
            id:item.id,
            name:item.name,
            tel:item.phone,
            address:item.province+item.city+item.address,
            isDefault:item.is_default==1?true:false,
          }
        })
      })
    })
    //定义切换地址的处理函数
    const switchAddress = (item)=>{
      SetDefaultAddressListInfo(item.id).then(res=>{
        if(res.status===204){
          router.push({name:'order'})
        }
      })
    }
    return {
      switchAddress,
      onClickLeft,
      list,
      onAdd,
      onEdit,
      chosenAddressId,
      switchable,
    }
  }
}
</script>

<style scoped>

</style>