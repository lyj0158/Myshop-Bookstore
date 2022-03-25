import {request} from "@/network/request";

//获取地址列表
export function previewOrder(){
    return request({
        url: 'api/orders/preview'
    })
}
//提交订单
export function SubmitOrder(id){
    return request({
        url: 'api/orders',
        method:'post',
        data:{
            address_id:id,
        }
    })
}
//获取支付二维码
export function PayCode(order,types){
    return request({
        url: `api/orders/${order}/pay?type=${types}`,
    })
}
//查询支付状态
export function PayStatus(order){
    return request({
        url: `api/orders/${order}/status`,
    })
}
//查询订单列表
export function queryOrderAllList(page=0){
    return request({
        url: `api/orders?include=goods,orderDetails&page=`+page,
    })
}
export function queryOrderList(status=0,page=0){
    return request({
        url: `api/orders/?status=${status}&include=goods,orderDetails&page=`+page,
    })
}
//获取订单详情
export function queryOrderDetail(order=0){
    return request({
        url: `api/orders/${order}?include=goods,orderDetails`,
    })
}