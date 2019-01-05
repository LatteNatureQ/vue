<template>
  <div>
    <!-- 头部 -->
    <myheader></myheader>

    <!-- 中间内容 -->
    <router-view></router-view>

    <!-- 尾部 -->
    <myfooter></myfooter>
  </div>
</template>

<script>
  //导入子组件
  import myheader from './components/layout/header'
  import myfooter from './components/layout/footer'

  export default {
    // 注册子组件
    components:{
      myheader,
      myfooter
    }
  }
</script>

<style>
  @import "./statics/site/css/style.css";
  /* @import "./statics/site/less/test.less"; */
</style>
