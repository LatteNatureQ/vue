<template>
  <div class="header">
    <!-- <p>{{ msg }}</p> -->
    <!-- 1.0 导航栏头部 -->
    <div class="head-top">
      <div class="section">
        <div class="left-box">
          <span>黑马买买买</span> <a target="_blank" href="#"></a>
          <a target="_blank" href="#"></a>
        </div>
        <div id="menu" class="right-box">
          <span v-if="!isLogin">
            <router-link to="/login" class="">登录</router-link>
            <strong>|</strong> <a href="" class="">注册</a> <strong>|</strong>
          </span>
          <span v-else>
            <router-link to="/vipCenter" class="">会员中心</router-link> <strong>|</strong> <a @click="logout">退出</a>
            <strong>|</strong>
          </span>
          <router-link to="/shopcart" class="">
            <i id="shoppingCartCount" class="iconfont icon-cart"></i>购物车(
            <span>
              <span>{{ $store.getters.getBuyCount }}</span> </span
            >)</router-link
          >
        </div>
      </div>
    </div>

    <!-- 2.0 导航条 -->
    <div class="head-nav">
      <div class="section">
        <div id="menu2" class="nav-box menuhd">
          <ul>
            <li class="index">
              <a href="#" class="">
                <span class="out" style="top: 0px;">首页</span>
              </a>
            </li>
            <li class="news">
              <a href="#" class="">
                <span class="out" style="top: 0px;">每日精选</span>
              </a>
            </li>
            <li class="photo">
              <a href="#" class="">
                <span class="out" style="top: 0px;">秒杀专区</span>
              </a>
            </li>
            <li class="video">
              <a href="#" class="">
                <span class="out" style="top: 0px;">黑马超市</span>
              </a>
            </li>
            <li class="down">
              <a href="#" class="">
                <span class="out" style="top: 0px;">会员权益</span>
              </a>
            </li>
            <li class="goods">
              <router-link to="/goodslist" class="router-link-exact-active ">
                <span class="out" style="top: 0px;">购物商城</span>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="search-box">
          <div class="input-box">
            <input
              id="keywords"
              name="keywords"
              type="text"
              onkeydown="if(event.keyCode==13){};"
              placeholder="输入关健字"
              x-webkit-speech=""
            />
          </div>
          <a href="javascript:;"> <i class="iconfont icon-search"></i> </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { bus } from "../../common/bus";

  export default {
    data() {
      return {
        // msg: "我希望长生不来..."
        isLogin: false
      };
    },
    created() {
      // console.log("--------created--------");

      /**
       * 参数1：事件名称
       * 参数2：触发了事件之后，执行的处理函数
       */
      bus.$on("logined", isLogin => {
        // console.log("-----------$once-------------")
        // console.log(isLogin)
        this.isLogin = isLogin;
      });

      this.checkLogin();
    },
    methods: {
      // 检查是否登录过
      checkLogin() {
        this.$axios.get("site/account/islogin").then(response => {
          if (response.data.code === "logined") {
            // 已经登录
            this.isLogin = true;
          }
        });
      },
      logout(){
        this.$confirm('确定退出?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.get("site/account/logout").then(response => {
            if(response.data.status === 0){
              // 把是否登录标识符设置为false
              this.isLogin = false
              
              // 跳转到登录页面
              this.$router.push({path:'/login'})
              
              this.$message({
                type: 'success',
                message: '退出成功!'
              });
            }
          })
        }).catch(() => {
                   
        });
      }
    },
    mounted() {
      // console.log("--------mounted--------");
      $("#menu2 li a").wrapInner('<span class="out"></span>');
      $("#menu2 li a").each(function() {
        $('<span class="over">' + $(this).text() + "</span>").appendTo(this);
      });

      $("#menu2 li a").hover(
        function() {
          $(".out", this)
            .stop()
            .animate({ top: "48px" }, 300); // move down - hide
          $(".over", this)
            .stop()
            .animate({ top: "0px" }, 300); // move down - show
        },
        function() {
          $(".out", this)
            .stop()
            .animate({ top: "0px" }, 300); // move up - show
          $(".over", this)
            .stop()
            .animate({ top: "-48px" }, 300); // move up - hide
        }
      );
    },
    updated() {
      // console.log("--------updated--------");
    }
  };
</script>

<style scoped>
  @import "../../statics/site/jquery_plugins/hoverNav/css/style.css";
</style>
