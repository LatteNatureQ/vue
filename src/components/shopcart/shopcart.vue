<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span> <a href="/index.html">首页</a> &gt;
        <a href="/cart.html">购物车</a>
      </div>
    </div>

    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <!--购物车头部-->
          <div class="cart-head clearfix">
            <h2><i class="iconfont icon-cart"></i>我的购物车</h2>
            <div class="cart-setp">
              <ul>
                <li class="first active">
                  <div class="progress"><span>1</span> 放进购物车</div>
                </li>
                <li>
                  <div class="progress"><span>2</span> 填写订单信息</div>
                </li>
                <li class="last">
                  <div class="progress"><span>3</span> 支付/确认订单</div>
                </li>
              </ul>
            </div>
          </div>
          <!--购物车头部-->
          <!--商品列表-->
          <div class="cart-box">
            <input id="jsondata" name="jsondata" type="hidden" />
            <table
              width="100%"
              align="center"
              class="cart-table"
              border="0"
              cellspacing="0"
              cellpadding="8"
            >
              <tbody>
                <tr>
                  <th width="48" align="center"><a>选择</a></th>
                  <th align="left" colspan="2">商品信息</th>
                  <th width="84" align="left">单价</th>
                  <th width="104" align="center">数量</th>
                  <th width="104" align="left">金额(元)</th>
                  <th width="54" align="center">操作</th>
                </tr>
                <tr v-for="(item,index) in goodsList" :key="item.id">
                  <td width="48" align="center">
                    <el-switch
                      v-model="item.isSelected"
                      active-color="#13ce66"
                      inactive-color="#cccccc"
                    >
                    </el-switch>
                  </td>
                  <td align="left" colspan="2">
                    <div class="shopInfo">
                      <img
                        :src="item.img_url"
                        alt=""
                        style="width: 50px; height: 50px; margin-right: 10px;"
                      />
                      <span>{{ item.title }}</span>
                    </div>
                  </td>
                  <td width="84" align="left">{{ item.sell_price }}</td>
                  <td width="104" align="center">
                      <!-- <inputnumber :initCount="item.buycount" :goodsId="item.id" @countChange="getCountChange"></inputnumber> -->
                      <el-input-number size="mini" :min="1" v-model="item.buycount" @change="getChangeCount(item.buycount,item.id)"></el-input-number>
                  </td>
                  <td width="104" align="left">
                    {{ item.buycount * item.sell_price }}
                  </td>
                  <td width="54" align="center">
                    <a @click="deleteGoods(item.id,index)">删除</a>
                  </td>
                </tr>
                <tr v-if="goodsList.length===0">
                  <td colspan="10">
                    <div class="msg-tips">
                      <div class="icon warning">
                        <i class="iconfont icon-tip"></i>
                      </div>
                      <div class="info">
                        <strong>购物车没有商品！</strong>
                        <p>
                          您的购物车为空，
                          <a href="/index.html">马上去购物</a>吧！
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th align="right" colspan="8">
                    已选择商品
                    <b class="red" id="totalQuantity">{{ getTotalCount }}</b> 件
                    &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                    <span class="red">￥</span>
                    <b class="red" id="totalAmount">{{ getTotalAmount }}</b
                    >元
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
          <!--/商品列表-->
          <!--购物车底部-->
          <div class="cart-foot clearfix">
            <div class="right-box">
              <button
                class="button"
                @click="$router.push({path:'/goodslist'})"
              >
                继续购物
              </button>
              <button
                class="submit"
                @click="goToOrder"
              >
                提交订单
              </button>
            </div>
          </div>
          <!--购物车底部-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getLocalGoods } from "../../common/localStorage";

  //导入子组件
  import inputnumber from "../subcomponents/inputnubmer";

  export default {
    //注册子组件
    components: {
      inputnumber
    },
    data() {
      return {
        goodsList: []
      };
    },
    created() {
      this.getGoodsListData();
    },
    computed: {
      getTotalCount() {
        let totalCount = 0;
        this.goodsList.forEach(item => {
          if (item.isSelected) {
            totalCount += item.buycount;
          }
        });
        return totalCount;
      },
      getTotalAmount() {
        let totalAmount = 0;
        this.goodsList.forEach(item => {
          if (item.isSelected) {
            totalAmount += item.buycount * item.sell_price;
          }
        });
        return totalAmount;
      }
    },
    methods: {
      getGoodsListData() {
        //取出本地的对象 {"87":2,"88":3}
        const localGoods = getLocalGoods();

        //把对象的key放入到一个数组中
        const ids = Object.keys(localGoods);
        if (ids.length === 0) {
          return;
        }

        const url = `site/comment/getshopcargoods/${ids.join(",")}`;
        this.$axios.get(url).then(response => {
          response.data.message.forEach(item => {
            item.buycount = localGoods[item.id];
            item.isSelected = true;
          });
          this.goodsList = response.data.message;
        });
      },
      getChangeCount(count,goodsId){
        // console.log(count,goodsId)
        this.$store.commit('updateGoods',{
          goodsId,
          count
        })
      },
      // 注册监听子组件触发的事件，然后执行的函数
      getCountChange(goods){
        // 遍历之前的数组，把数量改成正确的
        this.goodsList.forEach(item=>{
          if(goods.goodsId === item.id){
            item.buycount = goods.count
          }
        })

        // 调用vuex中的mutations的updateGoods，传递载荷
        // goods ===> {goodsId:87,count:5}
        this.$store.commit('updateGoods',goods)
      },
      deleteGoods(id,index){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //1.调用vuex中的mutations方法
          this.$store.commit('deleteGoods',id)

          //2.把goodsList对应的索引的元素干掉
          this.goodsList.splice(index,1)

          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      // 跳转到提交订单页面
      goToOrder(){
        const ids = []
        this.goodsList.forEach(item=>{
          if(item.isSelected){
            ids.push(item.id)
          }
        })

        if(ids.length === 0){
          this.$message({
            message: '至少选择一个商品进行结算',
            type: 'warning'
          });
          return
        }

        // 通过编程式导航跳转过去
        // this.$router.push({path:`/order?ids=${ids.join(',')}`})

        // 下面这种不行
        // this.$router.push({path:`/order`,query: { ids: ids.join(',') }})

        // 下面两种都可以
        // this.$router.push({path:`/order/${ids.join(',')}`})
        this.$router.push({name:`order`,params:{ids:ids.join(',')}})
      }
    }
  };
</script>

<style scoped>
  .shopInfo {
    display: flex;
    align-items: center;
  }
</style>
