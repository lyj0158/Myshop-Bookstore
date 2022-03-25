import {request} from "@/network/request";

//获取地址列表
export function getAddressList(){
    return request({
        url: 'api/address'
    })
}
//添加地址
export function addAddressList(data){
    return request({
        url: 'api/address',
        method:'post',
        data,
    })
}
//获取地址信息
export function getAddressListInfo(address){
    return request({
        url: `api/address/${address}`,
    })
}
//更新地址信息
export function UpAddressListInfo(address=0,data){
    return request({
        url: `api/address/${address}`,
        method:'put',
        data,
    })
}
//删除地址信息
export function DeleteAddressListInfo(address){
    return request({
        url: `api/address/${address}`,
        method:'delete',
    })
}
//设置默认地址
export function SetDefaultAddressListInfo(address){
    return request({
        url: `api/address/${address}/default`,
        method:'PATCH',
    })
}