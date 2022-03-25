import axios from "axios";
import { Toast,Notify } from 'vant';
import router from "@/router";
import store from "@/store";
export function request(config){
    const instance = axios.create({
        baseURL: 'https://api.shop.eduwork.cn/',
        timeout: 5000,
    });
    instance.interceptors.request.use( config => {
        let token = store.state.token;
        if(token){
            config.headers.Authorization = 'Bearer '+token;
        }
        console.log('请求拦截器开始运作');
        return config;
    },error => {
        console.log('请求拦截器启动失败');
        return error;
    });

    instance.interceptors.response.use( response=> {
        console.log('响应拦截器开始运作');
        return response;
    },error => {
        if(error.code === 'ECONNABORTED' || error.message ===   "Network Error" ||  error.message.includes("timeout")){
            Notify({ type: 'danger', message: '请求超时，请稍后重试' });
        }

        if(error.response.status===401){
            Notify({ type: 'danger', message: '请登录' });
            router.push({name:'signIn'})
        }

        console.log('响应拦截器启动失败');
        let errors = error.response.data.errors[Object.keys(error.response.data.errors)[0]][0]
        Toast.fail(errors);
        return Promise.reject(error);
    })
    return instance(config);
};