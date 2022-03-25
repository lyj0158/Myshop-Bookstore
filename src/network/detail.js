import {request} from "@/network/request";

export function getGoodsData(id){
    return request({
        url: 'api/goods/'+id
    })
}

export function getGoodsAboutData(id){
    return request({
        url: 'api/goods?category_id='+id
    })
}

//添加购物车
export function AddCarts(goods_id=0,num=1){
    return request({
        url: 'api/carts',
        method:"post",
        data:{
            goods_id,
            num,
        }
    })
}

//获取购物车列表
export function getCartList(include=''){
    return request({
        url: 'api/carts?'+include,
    })
}

//移出购物车
export function MoveCartList(cart=0){
    return request({
        url: 'api/carts/'+cart,// 模板编译: url: `api/carts/${cart}`
        method:'DELETE'
    })
}

//购物车数量改变
export function UpCartList(cart=0,num=0){
    return request({
        url: `api/carts/${cart}`,
        method:'put',
        data:{
            num,
        }
    })
}

//选中购物车
export function SelectCarList(data){
    return request({
        url: 'api/carts/checked',
        method:'patch',
        data,
    })
}
//收藏与取消收藏
export function addstarts(goods){
    return request({
        url: `api/collects/goods/${goods}`,
        method:'post',
    })
}
//获取收藏
export function getUserCollects(){
    return request({
        url: 'api/collects'
    })
}
