<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span> <a href="/index.html">首页</a> &gt;
        <a href="/goods.html">购物商城</a> &gt;
        <a href="/goods/42/1.html">商品详情</a>
      </div>
    </div>
    <div class="loadingtext section">
      <div v-if="goodsData.goodsinfo" class="wrapper clearfix">
        <div class="wrap-box">
          <div class="left-925">
            <div class="goods-box clearfix">
              <!-- 放大镜的代码写在这里 -->
              <div class="pic-box">
                <div class="magnifier" id="magnifier1">
                  <div class="magnifier-container">
                    <div class="images-cover"></div>
                    <!-- 当前图片显示容器 -->
                    <div class="move-view"></div>
                    <!-- 跟随鼠标移动的盒子 -->
                  </div>
                  <div class="magnifier-assembly">
                    <div class="magnifier-btn">
                      <span class="magnifier-btn-left">&lt;</span>
                      <span class="magnifier-btn-right">&gt;</span>
                    </div>
                    <!-- 按钮组 -->
                    <div class="magnifier-line">
                      <ul class="clearfix animation03">
                        <li v-for="item in goodsData.imglist">
                          <div class="small-img">
                            <img :src="item.thumb_path" />
                          </div>
                        </li>
                      </ul>
                    </div>
                    <!-- 缩略图 -->
                  </div>
                  <div class="magnifier-view"></div>
                  <!-- 经过放大的图片显示容器 -->
                </div>
              </div>
              <div class="goods-spec">
                <h1>{{ goodsData.goodsinfo.title }}</h1>
                <p class="subtitle">{{ goodsData.goodsinfo.sub_title }}</p>
                <div class="spec-box">
                  <dl>
                    <dt>货号</dt>
                    <dd id="commodityGoodsNo">
                      {{ goodsData.goodsinfo.goods_no }}
                    </dd>
                  </dl>
                  <dl>
                    <dt>市场价</dt>
                    <dd>
                      <s id="commodityMarketPrice"
                        >¥{{ goodsData.goodsinfo.market_price }}</s
                      >
                    </dd>
                  </dl>
                  <dl>
                    <dt>销售价</dt>
                    <dd>
                      <em id="commoditySellPrice" class="price"
                        >¥{{ goodsData.goodsinfo.sell_price }}</em
                      >
                    </dd>
                  </dl>
                </div>
                <div class="spec-box">
                  <dl>
                    <dt>购买数量</dt>
                    <dd>
                      <div class="stock-box">
                        <el-input-number
                          size="mini"
                          :min="1"
                          :max="goodsData.goodsinfo.stock_quantity"
                          v-model="goodsCount"
                        ></el-input-number>
                      </div>
                      <span class="stock-txt">
                        库存
                        <em id="commodityStockNum">{{
                          goodsData.goodsinfo.stock_quantity
                        }}</em
                        >件
                      </span>
                    </dd>
                  </dl>
                  <dl>
                    <dd>
                      <div id="buyButton" class="btn-buy">
                        <button
                          onclick="cartAdd(this,'/',1,'/shopping.html');"
                          class="buy"
                        >
                          立即购买
                        </button>
                        <button
                          @click="goToShopCart"
                          class="add"
                          id="addId"
                          ref="addRef"
                        >
                          加入购物车
                        </button>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div id="goodsTabs" class="goods-tab bg-wrap">
              <Affix>
                <div
                  id="tabHead"
                  class="tab-head"
                  style="position: static; top: 517px; width: 925px;"
                >
                  <ul>
                    <!--
                      <li @click="showIntroduction=true"><a href="javascript:;" :class="showIntroduction ? 'selected':''">商品介绍</a></li>
                      <li @click="showIntroduction=false"><a href="javascript:;" :class="showIntroduction ? '':'selected'">商品评论</a></li>
                    -->
                    <li @click="showIntroduction=true">
                      <a
                        href="javascript:;"
                        :class="{selected:showIntroduction}"
                        >商品介绍</a
                      >
                    </li>
                    <li @click="showIntroduction=false">
                      <a
                        href="javascript:;"
                        :class="{selected:!showIntroduction}"
                        >商品评论</a
                      >
                    </li>
                  </ul>
                </div>
              </Affix>
              <!-- 商品介绍 -->
              <div
                v-show="showIntroduction"
                class="tab-content entry"
                style="display: block;"
              >
                <p
                  style="padding:5px;"
                  v-html="goodsData.goodsinfo.content"
                ></p>
              </div>
              <!-- 商品评论 -->
              <div
                v-show="!showIntroduction"
                class="tab-content"
                style="display: block;"
              >
                <div class="comment-box">
                  <div id="commentForm" name="commentForm" class="form-box">
                    <div class="avatar-box">
                      <i class="iconfont icon-user-full"></i>
                    </div>
                    <div class="conn-box">
                      <div class="editor">
                        <textarea
                          id="txtContent"
                          name="txtContent"
                          sucmsg=" "
                          datatype="*10-1000"
                          v-model.trim="commenttxt"
                          nullmsg="请填写评论内容！"
                        ></textarea>
                        <span class="Validform_checktip"></span>
                      </div>
                      <div class="subcon">
                        <input
                          id="btnSubmit"
                          name="submit"
                          type="submit"
                          @click="postComment"
                          value="提交评论"
                          class="submit"
                        />
                        <span class="Validform_checktip"></span>
                      </div>
                    </div>
                  </div>
                  <ul id="commentList" class="list-box">
                    <p
                      v-if="commentList.length === 0"
                      style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);"
                    >
                      暂无评论，快来抢沙发吧！
                    </p>
                    <li v-for="item in commentList" :key="item.id">
                      <div class="avatar-box">
                        <i class="iconfont icon-user-full"></i>
                      </div>
                      <div class="inner-box">
                        <div class="info">
                          <span>{{ item.user_name }}</span>
                          <span
                            >{{item.add_time | dateFmt('YYYY-MM-DD HH:mm:ss')}}</span
                          >
                        </div>
                        <p>{{ item.content }}</p>
                      </div>
                    </li>
                  </ul>
                  <div class="page-box" style="margin: 5px 0px 0px 62px;">
                    <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="pageIndex"
                      :page-sizes="[5, 10, 15, 20]"
                      :page-size="pageSize"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="totalcount"
                    >
                    </el-pagination>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="left-220">
            <div class="bg-wrap nobg">
              <div class="sidebar-box">
                <h4>推荐商品</h4>
                <ul class="side-img-list">
                  <li v-for="item in goodsData.hotgoodslist" :key="item.id">
                    <div class="img-box">
                      <router-link :to="'/goodsinfo/'+item.id" class="">
                        <img :src="item.img_url" />
                      </router-link>
                    </div>
                    <div class="txt-box">
                      <router-link :to="'/goodsinfo/'+item.id" class="">{{
                        item.title
                      }}</router-link>
                      <span>{{ item.add_time | dateFmt }}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 动画的小图片 -->
    <transition
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:after-enter="afterEnter"
      >
      <div v-show="isShow" id="animateId" class="animateDiv" v-if="goodsData.imglist">
        <img :src="goodsData.imglist[0].original_path" alt="">
      </div>
    </transition>
  </div>
</template>

<script>
  //导入放大镜需要的js
  import "../../statics/site/jquery_plugins/jqimgzoom/js/magnifier";

  // 按需到如iview中的Affix图钉组件
  import { Affix } from "iview";

  // 按需导入element-ui的Loading组件
  import { Loading } from "element-ui";

  export default {
    //局部注册
    components: {
      Affix
    },
    data() {
      return {
        goodsData: {}, //商品数据
        goodsCount: 1, //商品的数量
        showIntroduction: true, //显示商品简介
        commentList: [], //评论数组
        pageIndex: 1, //加载评论数据时候的页数
        pageSize: 5, //加载评论数据时候每页多少条
        totalcount:0, //评论的总条数
        commenttxt:'',
        addTopShopCartOffset:null, //加入购物车的left&top值
        shoppingCartCountOffset:null, //购物车数量的left&top值
        isShow:false //动画是否显示
      };
    },
    created() {
      this.getGoodsData();
      this.getCommentListData();
    },
    watch: {
      $route: function() {
        //根据新的商品id，重新发送网络请求
        this.getGoodsData();
        this.getCommentListData();
      }
    },
    // 如果将来我们的updated中更改的模型值，万一在template中用到了，要小心些
    // 但是慎用，适合在数据回来之后，需要拿到dom做事情，并且将来我们的模型值还不会发生改变的情况下
    updated() {
      // 把购物车的小图标移动到加入购物车按钮的左上角
      
    },
    methods: {
      //获取商品的数据
      getGoodsData() {
        this.goodsData = {};

        // 创建一个Loading的service
        let loadingInstance = Loading.service({
          text: "请稍等",
          target: document.querySelector(".loadingtext")
        });

        this.$axios
          .get(`site/goods/getgoodsinfo/${this.$route.params.goodsId}`)
          .then(response => {
            this.goodsData = response.data.message;

            setTimeout(() => {
              console.log("**************************************")
              $("#magnifier1").imgzoon({ magnifier: "#magnifier1" });

              //先获取加入购物车按钮的偏移量(left、top)
              // this.addTopShopCartOffset = $("#addId").offset()
              this.addTopShopCartOffset = $(this.$refs.addRef).offset()
              this.shoppingCartCountOffset = $("#shoppingCartCount").offset()

              $("#animateId").css({left:this.addTopShopCartOffset.left,top:this.addTopShopCartOffset.top})
            }, 200);

            // 关闭掉loading的效果
            loadingInstance.close();
          });
      },
      //加载商品的评论数据
      getCommentListData() {
        const url = `site/comment/getbypage/goods/${
          this.$route.params.goodsId
        }?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`;

        this.$axios.get(url).then(response => {
          this.totalcount = response.data.totalcount
          this.commentList = response.data.message;
        });
      },
      /********* 评论相关 ************/
      handleSizeChange(pageSize){
        this.pageSize = pageSize
        this.pageIndex = 1

        this.getCommentListData()
      },
      handleCurrentChange(pageIndex){
        this.pageIndex = pageIndex

        this.getCommentListData()
      },
      //提交评论
      postComment(){
        if(this.commenttxt.length === 0){
          this.$message({
            message: '不能输入空哦',
            type: 'warning'
          });
          return
        }

        //提交给服务器
        this.$axios.post(`site/validate/comment/post/goods/${this.$route.params.goodsId}`,{
          commenttxt:this.commenttxt
        }).then(response=>{
          // 清空
          this.commenttxt = ''
          // 提示一下
          this.$message({
            message: '评论成功!',
            type: 'success'
          });
          // 重新加载第一页
          this.pageIndex = 1
          this.getCommentListData()
        })
      },
      /************动画相关*************/
      beforeEnter: function (el) {
        // 写开始位置的代码
        el.style.top = this.addTopShopCartOffset.top + 'px'
        el.style.left = this.addTopShopCartOffset.left + 'px'
        el.style.transform = 'scale(1.0)'
      },
      // 当与 CSS 结合使用时
      // 回调函数 done 是可选的
      enter: function (el,done) {
        // 刷新动画帧
        el.offsetWidth

        // 动画时长
        el.style.transition = 'all 0.5s'

        // 结束位置
        el.style.top = this.shoppingCartCountOffset.top - 5 + 'px'
        el.style.left = this.shoppingCartCountOffset.left + 'px'
        el.style.transform = 'scale(0.4)'

        done()
      },
      afterEnter: function (el) {
        this.isShow = false
      },
      //加入购物车的方法
      goToShopCart(){
        this.isShow = true

        //调用store中mutations的addGoods方法
        const payload = {
          goodsId:this.$route.params.goodsId,
          count:this.goodsCount
        }

        this.$store.commit('addGoods',payload)
      }
    }
  };
</script>

<style scoped>
  @import "../../statics/site/jquery_plugins/jqimgzoom/css/magnifier.css";

  .animateDiv{
    width:50px;
    height: 50px;
    position: absolute;
    left:0;
    top:0;
  }

  .animateDiv img{
    width:100%;
    height: 100%;
  }
</style>
