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
                <li class="active">
                  <div class="progress"><span>2</span> 填写订单信息</div>
                </li>
                <li class="last">
                  <div class="progress"><span>3</span> 支付/确认订单</div>
                </li>
              </ul>
            </div>
          </div>
          <!--购物车头部-->
          <div class="cart-box">
            <h2 class="slide-tit"><span>1、收货地址</span></h2>
            <div id="orderForm" name="orderForm" url="">
              <div class="form-box address-info">
                <el-form
                  status-icon
                  :model="orderForm"
                  :rules="rules"
                  ref="orderForm"
                  label-width="150px"
                  class="demo-ruleForm"
                >
                  <el-form-item label="收货人姓名：" prop="accept_name">
                    <el-input
                      style="width:500px"
                      v-model="orderForm.accept_name"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="所属地区：" prop="area">
                    <v-distpicker
                      @selected="onSelected"
                      :province="orderForm.area.province.value"
                      :city="orderForm.area.city.value"
                      :area="orderForm.area.area.value"
                    ></v-distpicker>
                  </el-form-item>
                  <el-form-item label="详细地址：" prop="address">
                    <el-input
                      style="width:500px"
                      v-model="orderForm.address"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="手机号码：" prop="mobile">
                    <el-input
                      style="width:500px"
                      v-model="orderForm.mobile"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="电子邮箱：">
                    <el-input
                      style="width:500px"
                      v-model="orderForm.email"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="邮编：">
                    <el-input
                      style="width:150px"
                      v-model="orderForm.post_code"
                    ></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <h2 class="slide-tit"><span>2、支付方式</span></h2>
              <ul class="item-box clearfix">
                <li>
                  <label>
                    <el-radio v-model="orderForm.payment_id" label="6"
                      >在线支付</el-radio
                    ><em>手续费：0.00元</em>
                  </label>
                </li>
              </ul>
              <h2 class="slide-tit"><span>3、配送方式</span></h2>
              <ul class="item-box clearfix">
                <li>
                  <label>
                    <el-radio-group
                      @change="changeExpress"
                      v-model="orderForm.express_id"
                    >
                      <el-radio label="1"
                        >顺丰快递 <em>费用：20.00元</em></el-radio
                      >
                      <el-radio label="2">圆通 <em>费用：10.00元</em></el-radio>
                      <el-radio label="3">韵达 <em>费用：8.00元</em></el-radio>
                    </el-radio-group>
                  </label>
                </li>
              </ul>
              <h2 class="slide-tit"><span>4、商品清单</span></h2>
              <div class="line15"></div>
              <table
                width="100%"
                border="0"
                align="center"
                cellpadding="8"
                cellspacing="0"
                class="cart-table"
              >
                <tbody>
                  <tr>
                    <th colspan="2" align="left">商品信息</th>
                    <th width="84" align="left">单价</th>
                    <th width="84" align="center">购买数量</th>
                    <th width="104" align="left">金额(元)</th>
                  </tr>
                  <tr v-for="item in goodsList" :key="item.id">
                    <td width="68">
                      <a target="_blank" href="/goods/show-89.html">
                        <img :src="item.img_url" class="img" />
                      </a>
                    </td>
                    <td>
                      <a target="_blank" href="/goods/show-89.html">{{
                        item.title
                      }}</a>
                    </td>
                    <td>
                      <span class="red"> ￥{{ item.sell_price }} </span>
                    </td>
                    <td align="center">{{ item.buycount }}</td>
                    <td>
                      <span class="red">
                        ￥{{ item.buycount * item.sell_price }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="line15"></div>
              <h2 class="slide-tit"><span>5、结算信息</span></h2>
              <div class="buy-foot clearfix">
                <div class="left-box">
                  <dl>
                    <dt>订单备注(100字符以内)</dt>
                    <dd>
                      <textarea
                        name="message"
                        class="input"
                        style="height:35px;"
                        v-model="orderForm.message"
                      ></textarea>
                    </dd>
                  </dl>
                </div>
                <div class="right-box">
                  <p>
                    商品
                    <label class="price">{{ totalCount }}</label>
                    件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                    <label id="goodsAmount" class="price">{{
                      totalPrice
                    }}</label>
                    元&nbsp;&nbsp;&nbsp;&nbsp;
                  </p>
                  <p>
                    运费：￥
                    <label id="expressFee" class="price">{{
                      orderForm.expressMoment
                    }}</label>
                    元
                  </p>
                  <p class="txt-box">
                    应付总金额：￥
                    <label id="totalAmount" class="price">{{
                      getTotalAmount
                    }}</label>
                  </p>
                  <p class="btn-box">
                    <!-- <router-link class="btn button" to="/shopcart">返回购物车</router-link> -->
                    <!-- <a class="btn button" @click="$router.push({path:'/shopcart'})">返回购物车</a> -->
                    <a class="btn button" @click="$router.go(-1)">返回购物车</a>
                    <a id="btnSubmit" @click="postOrder" class="btn submit"
                      >确认提交</a
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // 导入子组件
  import VDistpicker from "v-distpicker";

  import { getLocalGoods } from "../../common/localStorage";

  export default {
    // 注册子组件
    components: { VDistpicker },
    created() {
      this.getGoodsList();
    },
    data() {
      //自定义校验规则函数
      /**
       * rule 规则对象本身
       * value 传递过来要校验的值
       * callback 判断传递过来的值，是否合法
       *  callback(new Error(不符合要求))
       *  callback() 符合要求的
       *
       *
       */
      var checkMobile = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("手机号码不能为空"));
        }

        // 直接进行正则匹配
        const reg = /^1[3456789][0-9]{9}$/;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("手机号不合法"));
        }
      };
      return {
        goodsList: [], //商品列表
        totalCount: 0, //总数量
        totalPrice: 0, //商品的总价格，不包含运费
        orderForm: {
          accept_name: "孙姐", //收货人姓名
          area: {
            province: { code: "440000", value: "广东省" },
            city: { code: "440300", value: "深圳市" },
            area: { code: "440306", value: "宝安区" }
          },
          address: "翻身黄金公寓", //详细地址
          mobile: "13812345678", //手机号
          email: "sunjie@vip.163.com", //邮箱
          post_code: "612345", //邮箱
          payment_id: "6", //支付方式
          express_id: "1", //快递方式 1 顺丰 2 圆通 3 韵达
          expressMoment: 20, //快递费，顺丰 20 圆通 10 韵达 8
          message: "快点发货吧", //备注
          goodsAmount: 0, //总价格 包含了运费
          goodsids: null, //购买的商品的ids
          cargoodsobj: {} //购买商品的明细
        },
        rules: {
          accept_name: [
            { required: true, message: "请输入收货人姓名", trigger: "blur" },
            { min: 2, message: "姓名至少两个字", trigger: "blur" }
          ],
          area: [{ required: true, message: "请选择地址", trigger: "blur" }],
          address: [
            { required: true, message: "请输入详细地址", trigger: "blur" }
          ],
          mobile: [
            { required: true, trigger: "blur" },
            { validator: checkMobile, trigger: "blur" }
          ]
        }
      };
    },
    computed: {
      getTotalAmount() {
        //总价格，包含了运费的
        // this.orderForm.goodsAmount =
        //   this.totalPrice + this.orderForm.expressMoment;
        return this.totalPrice + this.orderForm.expressMoment;
      }
    },
    methods: {
      getGoodsList() {
        //获取本地的商品信息
        const localGoods = getLocalGoods();

        // 赋值给goodsids
        this.orderForm.goodsids = this.$route.params.ids;

        // 检查先传递过来的id是否在本地中有，如果没有，go out
        const ids = this.$route.params.ids.split(',')
        ids.forEach(id=>{
          if(!localGoods[id]){
            this.$router.push('/shopcart')
            return
          }
        })

        if(!this.$route.params.ids) return

        const url = `site/validate/order/getgoodslist/${
          this.$route.params.ids
        }`;
        this.$axios.get(url).then(response => {
          response.data.message.forEach(item => {
            // 给每一项的buycount设置为正确的值
            // item.buycount = localGoods[item.id];
            item.buycount = 3

            console.log(typeof item.buycount)

            // 计算总数量 & 总价格
            this.totalCount += item.buycount;
            this.totalPrice += item.buycount * item.sell_price;

            // 给cargoodsobj设置属性和值
            this.orderForm.cargoodsobj[item.id] = item.buycount;

            console.log(this.orderForm.cargoodsobj)
          });

          this.orderForm.goodsAmount = this.totalPrice 

          this.goodsList = response.data.message;
        });
      },
      onSelected(value) {
        this.orderForm.area = value;
      },
      changeExpress(label) {
        switch (label) {
          case "1":
            this.orderForm.expressMoment = 20;
            break;

          case "2":
            this.orderForm.expressMoment = 10;
            break;

          case "3":
            this.orderForm.expressMoment = 8;
            break;

          default:
            break;
        }
      },
      postOrder() {
        // 1、校验该填写的内容是否填写了
        this.$refs.orderForm.validate(valid => {
          if (valid) {
            //2、发送请求给后台，提交订单
            this.$axios.post('site/validate/order/setorder',this.orderForm).then(response=>{
              if(response.data.status === 0){
                //3、把已经下单的删除掉
                const ids = this.$route.params.ids.split(',')
                ids.forEach(goodsId=>{
                  // 4、调用仓库中根据id删除的方法
                  this.$store.commit('deleteGoods',goodsId)
                })

                //5、跳到支付页面里面去，并且带过去订单id
                this.$router.push({path:'/pay',query:{orderid:response.data.message.orderid}})
              }
            })
          } else {
            this.$message({
              message: "订单信息请填写完整哦~",
              type: "warning"
            });
          }
        });
      }
    }
  };
</script>
