import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex) //this.$store

import {
    addLocalGoods,
    getTotalCount,
    updateLocalGoods,
    deleteLocalGoods
} from '../common/localStorage'

const store = new Vuex.Store({
    // 要操作的的数据
    state:{
        buycount:getTotalCount()
    },
    getters:{
        // getBuyCount(state){

        // }
        getBuyCount:state=>{
            return state.buycount
        }
    },
    // 存
    mutations:{
       addGoods(state,goods){
            //先操作localStorage存到本地，本地返回了总数，赋值给
            //buycount即可
            state.buycount = addLocalGoods(goods)
       },
       updateGoods(state,goods){
            //先修改localStorage存到本地，本地返回了总数，赋值给
            //buycount即可
            state.buycount = updateLocalGoods(goods)
       },
       deleteGoods(state,goodsId){
            //先删除本地的数据，本地返回了总数，赋值给
            //buycount即可
            state.buycount = deleteLocalGoods(goodsId)
       }
    }
})

export default store