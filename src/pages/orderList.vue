<!--  -->
<template>
  <div class="order-list">
    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <loading v-if="loading"></loading>
          <div class="order" v-for="(order,index) in list" :key="index">
            <div class="order-title">
              <div class="item-info fl">
                <span>{{order.createTime}}</span>
                <span>{{order.receiverName}}</span>
                <span>订单号：{{order.orderNo}} </span>
                <span>在线支付</span>
              </div>
              <div class="item-money fr">
                <span>应付金额：</span>
                <span class="money">{{order.payment}}</span>
                <span>元</span>
              </div>
            </div>
            <div class="order-content">
              <div class="good-box fl">
                <div class="good-list" v-for="(item, index) in order.orderItemVoList" :key="index">
                  <div class="good-img">
                    <img :src="item.productImage" alt="">
                  </div>
                  <div class="good-name">
                    <div class="p-name">{{item.productName}}</div>
                    <div class="p-money">{{item.currentUnitPrice}} X {{item.quantity}}元</div>
                  </div>
                </div>
              </div>
              <div class="good-state fr" v-if="order.status == 10">
                <a href="javascript:;" @click="goPay(order.orderNo)">{{order.statusDesc}}</a>
              </div>
              <div class="good-state fr" v-else>
                <a href="javascript:;">{{order.statusDesc}}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '../components/Loading'
export default {
  name: 'order-list',
  data() {
    return {
      list: [],
      loading: true
    }
  },
  components: {
    Loading
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getOrderList();
  },
  methods: {
    getOrderList() {
      this.axios.get('/orders').then((res) => {
       this.list = res.list;
       this.loading = false;
      }).catch(() => {
        this.loading = false;
      })
    },
    goPay(orderNo) {
      this.$router.push({
        path: '/order/pay',
        query: {
          orderNo
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/scss/config.scss';
.order-list{
  .wrapper{
    background-color:$colorJ;
    padding-top:33px;
    padding-bottom:110px;
    .order-box{
      .order{
        border: 1px solid #e5e5e5;
        background: #fff;
        margin-bottom:31px;
        &:last-child{
          margin-bottom:0;
        }
        .order-title{
          line-height: 70px;
          height: 70px;
          background-color:$colorK;
          padding:0px 43px;
          font-size:16px;
          color:$colorC;
          overflow: hidden;
          .item-info{
            span {
              height: 100%;
              line-height: 16px;
              padding: 0px 15px;
              border-right: 1px solid $colorC;
              &:last-child{
                border: none;
              }
            }
          }
          .money{
            font-size:26px;
            color:$colorB;
          }
        }
        .order-content{
          padding:0 43px;
          overflow: hidden;
          .good-box{
            width:88%;
            .good-list{
              display: flex;
              align-items: center;
              height:145px;
              .good-img{
                width:112px;
                img{
                  width:100%;
                }
              }
              .good-name{
                font-size:20px;
                color:$colorB;
              }
            }
          }
          .good-state{
            line-height: 145px;
            font-size: 20px;
            color:$colorA;
            a{
              color:$colorA;
            }
          }
        }
      }
    }
  }
}
</style>
