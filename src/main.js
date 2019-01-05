import Vue from 'vue';
import App from './App.vue';
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  loading: require('./statics/site/images/01.gif') //图片没有加载出来之前的占位图片
})

//对所有的ElementUI组件进行全局注册，后续会优化
// Vue.use(ElementUI);

//按需导入ElementUI
import {
  Button,
  Pagination,
  Input,
  InputNumber,
  Switch,
  Form,
  FormItem,
  Radio,
  RadioGroup,
  MessageBox,
  Message,
  Carousel,
  CarouselItem,
  Row,
  Col,
  Table,
  TableColumn
} from 'element-ui'

Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Button) //自动导入element-ui/lib/theme-chalk/button.css
Vue.use(Pagination)
Vue.use(InputNumber)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Input)
Vue.use(Switch)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

//打包filters下面的index.js
import './filters'

// 路由根vuex都得注入到根实例中
import router from './router'
// import router from './router/test'
import store from './store'

//创建根实例，渲染根组件
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
