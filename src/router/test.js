import Vue from 'vue';
import VueRouter from 'vue-router'
//如果在一个模块化工程中使用它，必须要通过 Vue.use() 明确地安装路由功能：
Vue.use(VueRouter) //this.$route / this.$router

import mixins1 from '../test/mixins1'
import mixins2 from '../test/mixins2'
import slot_test from '../test/slot_test'
import slot3 from '../test/slot3'
import slot4 from '../test/slot4'
import dynamic from '../test/dynamic'

const router = new VueRouter({
    routes:[
      {path:'/mixins1',component:mixins1},
      {path:'/mixins2',component:mixins2},
      {path:'/slot_test',component:slot_test},
      {path:'/slot3',component:slot3},
      {path:'/slot4',component:slot4},
      {path:'/dynamic',component:dynamic}
    ]
})

export default router