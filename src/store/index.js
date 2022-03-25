import { createStore } from 'vuex'
import {getCartList} from "@/network/detail";

export default createStore({
  state: {
    loading: false,
    token: window.localStorage.getItem('token'),
    carcount:0,
  },
  getters: {
  },
  mutations: {
    updateCarNum(state,num){
      state.carcount = num;
    }
  },
  actions: {
    upCarNum({commit}){
      getCartList().then(res=>{
        commit('updateCarNum',res.data.data.length?res.data.data.length:0)
      })
    }
  },
  modules: {
  }
})
