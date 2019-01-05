<template>
  <div>
    <div class="sub-tit">
      <ul>
        <li class="selected"><a href="/user/order-list.html">交易订单</a></li>
      </ul>
    </div>
    <div class="table-wrap">
      <el-table
        stripe
        :data="orders"
        @selection-change="handleSelectionChange"
        style="width: 100%"
      >
        <!-- <el-table-column
          type="selection"
          width="55">
        </el-table-column> -->
        <el-table-column prop="order_no" label="订单号" width="180">
        </el-table-column>
        <el-table-column prop="accept_name" label="收货人"> </el-table-column>
        <el-table-column prop="order_amount" label="订单金额">
        </el-table-column>
        <el-table-column
          prop="add_time"
          width="180"
          :formatter="formatter"
          label="下单时间"
        >
        </el-table-column>
        <el-table-column prop="statusName" label="状态"> </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              @click="$router.push(`/vipCenter/orderInfo?orderid=${scope.row.id}`)"
              type="text"
              size="small"
              >查看订单</el-button
            >
            <el-button
              v-if="scope.row.status===1"
              type="text"
              @click="$router.push(`/pay?orderid=${scope.row.id}`)"
              size="small"
              >去支付</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="page-foot" style="margin-top:15px;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from "moment";

  export default {
    data() {
      return {
        pageIndex: 1, //页码
        pageSize: 10, //页容量
        orders: [],
        total: 0
      };
    },
    created() {
      this.getOrdersData();
    },
    methods: {
      getOrdersData() {
        const url = `site/validate/order/userorderlist?pageIndex=${
          this.pageIndex
        }&pageSize=${this.pageSize}`;

        this.$axios.get(url).then(response => {
          this.orders = response.data.message;
          this.total = response.data.totalcount;
        });
      },
      // 格式化方法
      formatter(row, column) {
        return moment(row.add_time).format("YYYY-MM-DD HH:mm:ss");
      },
      // 当选择时候触发的方法
      handleSelectionChange(selection) {
        // console.log(selection)
      },
      // 分页相关的函数
      handleSizeChange(pageSize) {
        // console.log(pageSize)
        this.pageIndex = 1;
        this.pageSize = pageSize;

        this.getOrdersData();
      },
      // 当前的页面发生了改变
      handleCurrentChange(pageIndex) {
        // console.log(pageIndex)
        this.pageIndex = pageIndex;
        this.getOrdersData();
      }
    }
  };
</script>
