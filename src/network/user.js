import {request} from "@/network/request";
//注册
export function PostRegister(data){
    return request({
        url: 'api/auth/register',
        method: 'post',
        data,
    })
}
//登录
export function PostLogin(data){
    return request({
        url: 'api/auth/login',
        method: 'post',
        data,
    })
}
//退出
export  function Logout(){
    return request({
        url: 'api/auth/logout',
        method: 'post'
    })
}
//获取用户信息
export function getUserDates(){
    return request({
        url: 'api/user'
    })
}
//更改用户名
export function changeUserName(name){
    return request({
        url: 'api/user',
        method:'put',
        data:{
            name
        }
    })
}
//发送手机验证码
export function getPhoneVerification (phone=''){
    return request({
        url: 'api/auth/phone/code',
        method:'POST',
        data:{
            phone,
        }
    })
}
//绑定手机号
export function BindPhone(code='',phone=''){
    return request({
        url: 'api/auth/phone/update',
        method:'PATCH',
        data:{
            code,
            phone,
        }
    })
}
//发送邮箱验证码
export function getEmailVerification (email=''){
    return request({
        url: 'api/auth/email/code',
        method:'POST',
        data:{
            email,
        }
    })
}
//更换邮箱
export function BindEmail(code='',email=''){
    return request({
        url: 'api/auth/email/update',
        method:'PATCH',
        data:{
            code,
            email,
        }
    })
}
//更换密码
export function changePwd(old_password='',password='',password_confirmation=''){
    return request({
        url: 'api/auth/password/update',
        method:'POST',
        data:{
            old_password,
            password,
            password_confirmation,
        }
    })
}
//找回密码

//更换密码
export function Retrieve(code='',email='',password='',password_confirmation=''){
    return request({
        url: 'api/auth/reset/password/email',
        method:'POST',
        data:{
            code,
            email,
            password,
            password_confirmation,
        }
    })
}
export function addUserAdress(datas){
    return request({
        url: 'api/address',
        method: 'post',
        datas,
    })
}

//获取阿里云OSS Token
export function getOssToken(){
    return request({
        url: 'api/auth/oss/token',
    })
}
//更换头像
export function changeHead(avatar){
    return request({
        url: 'api/user/avatar',
        method:'PATCH',
        data:{
            avatar,
        }
    })
}