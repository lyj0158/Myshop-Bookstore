<template>
  <van-nav-bar
      :title="$route.query.type==='add'?'新增地址':'编辑地址'"
      left-arrow
      @click-left="onClickLeft"
  />
  <van-address-edit
      :area-list="areaList"
      show-set-default
      :address-info="info"
      :show-delete="deletes"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-default="ChangeDefault"
  />
</template>

<script>
import { ref,onMounted } from 'vue';
import { Toast } from 'vant';
import { areaList } from '@vant/area-data';
import {useRouter,useRoute} from "vue-router";
import { Dialog } from 'vant';
import {addAddressList,getAddressListInfo,UpAddressListInfo,DeleteAddressListInfo,SetDefaultAddressListInfo} from "@/network/address";
export default {
  name: "AddAddress",
  setup(){
    const onClickLeft = () => history.back();
    const router = useRouter();
    const route =useRoute();
    const info = ref({})
    const deletes = ref(false)
    onMounted(()=>{
      if(route.query.type==='edit'){
        deletes.value = true;
        getAddressListInfo(route.query.id).then(res=>{
          console.log(res);
          //获取地区编码
          let areaCode = ''
          for (let key in areaList.county_list){
            if(areaList.county_list[key]===res.data.county){
              areaCode = key;
            }
          }
          info.value = {
            name:res.data.name,
            tel:res.data.phone,
            province:res.data.province,
            city:res.data.city,
            county:res.data.county,
            addressDetail:res.data.province+res.data.city+res.data.county,
            areaCode,
            isDefault:res.data.is_default==1?true:false,
          }
        })
      }
    })
    //保存地址信息的处理函数
    const onSave = (content) => {
      //组装用于提交的数据格式
      let  datas = {
        name:content.name,
        address:content.addressDetail,
        phone:content.tel,
        province:content.province,
        city:content.city,
        county:content.county,
        is_default:content.isDefault?1:'',
      }
      //判断当前操作是否为新增
      if (route.query.type==='add'){
        //发送保存的数据
        addAddressList(datas).then(res=>{
          if(res.status===201){
            Toast.success('添加成功!')
            router.push({name:'address'})
          }
        })
      }else {
        UpAddressListInfo(route.query.id,datas).then(res=>{
          Toast.success('更改成功!')
          router.push({name:'address'})
        })
      }
    };
    //点击删除事件
    const onDelete = ()=>{
      Dialog.confirm({
        title: '提示',
        message:
            '确认删除吗？',
      })
          .then(() => {
            DeleteAddressListInfo(route.query.id).then(res=>{
              Toast.success('删除成功!')
              router.push({name:'address'})
            })
          })
          .catch(() => {});
    }
    //设置默认地址的处理函数
    const ChangeDefault = (val)=>{
      if(val){
        SetDefaultAddressListInfo(route.query.id).then(res=>{
          if(res.status===204){
            Toast.success('设置默认地址成功!')
            router.push({name:'address'})
          }
        })
      }
    }
    return {
      onClickLeft,
      onSave,
      areaList,
      deletes,
      info,
      onDelete,
      ChangeDefault,
    };
  }
}
</script>

<style scoped>

</style>