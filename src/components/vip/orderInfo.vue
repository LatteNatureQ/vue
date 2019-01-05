<template>
  <div>
    <div class="sub-tit">
      <a @click="$router.go(-1)" class="add">
        <i class="iconfont icon-reply"></i>返回</a
      >
      <ul>
        <li class="selected"><a href="javascript:;">查看订单</a></li>
      </ul>
    </div>
    <div class="order-progress">
      <ul>
        <li class="first active">
          <div class="progress">下单</div>
          <div class="info">2017-10-25 21:38:15</div>
        </li>
        <li :class="{active:orderInfo.status>=2}">
          <div class="progress">已付款</div>
          <div class="info">2017-10-25 21:38:15</div>
        </li>
        <li class="">
          <div class="progress">已经发货</div>
          <div class="info">2017-10-25 21:38:15</div>
        </li>
        <li class="last">
          <div class="progress">已完成</div>
          <div class="info">2017-10-25 21:38:15</div>
        </li>
      </ul>
    </div>
    <div class="form-box accept-box form-box1">
      <dl class="head form-group">
        <dd>
          订单号：{{orderInfo.order_no}}

          <router-link v-if="orderInfo.status===1" :to="'/pay?orderid='+orderInfo.id" class="btn-pay">去付款</router-link>
          <!---->
        </dd>
      </dl>
      <dl class="form-group">
        <dt>订单状态：</dt>
        <dd>{{orderInfo.statusName}}</dd>
      </dl>
      <dl class="form-group">
        <dt>快递方式：</dt>
        <dd>{{orderInfo.expressTitle}}</dd>
      </dl>
      <dl class="form-group">
        <dt>支付方式：</dt>
        <dd>{{orderInfo.paymentTitle}}</dd>
      </dl>
    </div>
    <div class="table-wrap">
      <table
        width="100%"
        border="0"
        cellspacing="0"
        cellpadding="5"
        class="ftable"
      >
        <tbody>
          <tr>
            <th align="left">商品信息</th>
            <th width="60%">名称</th>
            <th width="10%">单价</th>
            <th width="10%">数量</th>
            <th width="10%">金额</th>
          </tr>
          <tr v-for="item in goodsList" :key="item.id">
            <td width="60">
              <img
                style="width:50px;height:50px"
                :src="item.imgurl"
                class="img"
              />
            </td>
            <td align="left">
              <a target="_blank" href="/goods/show-92.html"
                >{{item.goods_title}}</a
              >
            </td>
            <td align="center">
              <s>￥{{item.real_price}}</s>
              <p>￥{{item.goods_price}}</p>
            </td>
            <td align="center">{{item.quantity}}</td>
            <td align="center">￥{{item.quantity * item.real_price}}</td>
          </tr>
          <tr>
            <td colspan="7" align="right">
              <p>
                商品金额：
                <b class="red">￥{{orderInfo.real_amount}}</b>&nbsp;&nbsp;+&nbsp;&nbsp;运费：
                <b class="red">￥{{orderInfo.express_fee}}</b>
              </p>
              <p style="font-size: 22px;">
                应付总金额： <b class="red">￥{{orderInfo.order_amount}}</b>
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="form-box accept-box">
      <dl class="head form-group"><dd>收货信息</dd></dl>
      <dl class="form-group">
        <dt>顾客姓名：</dt>
        <dd>{{orderInfo.accept_name}}</dd>
      </dl>
      <dl class="form-group">
        <dt>送货地址：</dt>
        <dd>{{orderInfo.area}} {{orderInfo.address}}</dd>
      </dl>
      <dl class="form-group">
        <dt>联系电话：</dt>
        <dd>{{orderInfo.mobile}}</dd>
      </dl>
      <dl class="form-group">
        <dt>电子邮箱：</dt>
        <dd>{{orderInfo.email}}</dd>
      </dl>
      <dl class="form-group">
        <dt>备注留言：</dt>
        <dd>{{orderInfo.message}}</dd>
      </dl>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        orderInfo:{},
        goodsList:[]
      }
    },
    created(){
      this.getOrderInfoData()
    },
    methods:{
      getOrderInfoData(){
        const url = `site/validate/order/getorderdetial/${this.$route.query.orderid}`

        this.$axios.get(url).then(response=>{
          // console.log(response)
          this.orderInfo = response.data.message.orderinfo
          this.goodsList = response.data.message.goodslist
        })
      }
    }
  }
</script>
