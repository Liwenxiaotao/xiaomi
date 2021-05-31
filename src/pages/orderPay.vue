<!-- 支付页面 -->
<template>
  <div class="order-pay">
    <div class="container">
      <div class="wrapper">
        <div class="order-wrapper">
          <div class="item-order">
            <div class="order-info">
                <h2>订单提交成功！去付款咯～</h2>
                <p>请在<span>30分</span>内完成支付, 超时后将取消订单</p>
                <p>{{addressInfo}}</p>
              </div>
              <div class="order-total">
                <p>应付总额：<span>{{totalMoney}}</span>元</p>
                <p>订单详情<em class="icon-down" :class="{'up': showDetail}"  @click="showDetail=!showDetail"></em></p>
              </div>
          </div>
          <div class="item-detail" v-if="showDetail">
            <div class="item">
              <div class="detail-title">订单号：</div>
              <div class="detail-info theme-color">{{orderNo}}</div>
            </div>
            <div class="item">
              <div class="detail-title">收货信息：</div>
              <div class="detail-info">{{addressInfo}}</div>
            </div>
            <div class="item good">
              <div class="detail-title">商品名称：</div>
              <div class="detail-info">
                <ul>
                  <li v-for="(item,index) in orderDetail" :key="index">
                    <img v-lazy="item.productImage"/>{{item.productName}}
                  </li>
                  <li v-for="(item, index) in orderDetail" :key="index">
                    <img v-lazy="item.productImage" alt="">{{item.productName}}
                  </li>
                </ul>
              </div>
            </div>
            <div class="item">
              <div class="detail-title">发票信息：</div>
              <div class="detail-info">电子发票 个人</div>
            </div>
          </div>
        </div>
        <div class="item-pay">
          <h3>选择以下支付方式付款</h3>
          <div class="pay-way">
            <p>支付平台</p>
            <div class="pay pay-ali" :class="{'checked': payType === 1}" @click="payType=1"></div>
            <div class="pay pay-wechat" :class="{'checked': payType === 2}" @click="payType=2"></div>
          </div>
          <div class="btn-wrap">
            <a href="javascript:;" class="btn btn-large" @click="paySubmit">确认支付</a>
          </div>
        </div>
      </div>
    </div>
    <scan-pay-code v-if="showPay" :img="payImg" @close="closePayModal"></scan-pay-code>
    <modal
    title="支付确认"
    :btnType="'3'"
    :showModal="showPayModal"
    sureText="查看订单"
    cancelText="未支付"
    @cancel="showPayModal=false"
    @submit="goOrderList">
    <template v-slot:body>
      您确认是否完成支付？
    </template>
    </modal>
  </div>
</template>

<script>
import qrcode from 'qrcode'
import ScanPayCode from '../components/ScanPayCode'
import Modal from '../components/Modal'
export default {
  name: '',
  data() {
    return {
      showDetail: false,
      orderNo: this.$route.query.orderNo,
      addressInfo: '',
      orderDetail:[],
      totalMoney: 0,
      payType: 1,
      showPay:false,
      payImg: '',
      showPayModal: false,
      timer: null
    }
  },
  components: {
    ScanPayCode,
    Modal
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getOrderDatail();
  },
  methods: {
    getOrderDatail() {
      this.axios.get(`/orders/${this.orderNo}`).then((res) => {
        console.log(res);
        let item = res.shippingVo;
        this.addressInfo = `${item.receiverName} ${item.receiverMobile} ${item.receiverProvince} ${item.receiverCity} ${item.receiverDistrict} ${item.receiverAddress}`;
        this.orderDetail = res.orderItemVoList;
        this.totalMoney = res.payment;
      })
    },
    paySubmit() {
      if (this.payType ===1) {
        window.open(`/#/order/alipay?orderNo=${this.orderNo}`, '_blank');
      } else {
        this.axios.post('/pay', {
          orderId: this.orderNo,
          orderName: '模拟微信',
          amount: 0.01,
          payType: 2
        }).then((res) => {
          qrcode.toDataURL(res.content).then((url) => {
            this.showPay = true;
            this.payImg = url;
            this.loopOrderState();
          })
        }).catch(() => {
          this.$message.error('二维码生成失败，请重试')
        })
      }
    },
    closePayModal() {
      this.showPay = false;
      this.showPayModal = true;
      clearInterval(this.timer);
    },
    // 轮询支付状态
    loopOrderState() {
      this.timer = setInterval(() => {
        this.axios.get(`/orders/${this.orderNo}`).then((res) => {
          if(res.status === 20) {
            clearInterval(this.timer);
            this.goOrderList();
          }
        })
      }, 1000)
    },
    goOrderList() {
      this.$router.push('/order/list')
    }
  }
}
</script>

<style lang="scss" scoped>
.order-pay{
  .wrapper {
    background-color:#F5F5F5;
    padding-top:30px;
    padding-bottom:61px;
    .order-wrapper {
      padding: 62px 50px;
      background-color: #fff;
      font-size:14px;
      margin-bottom:30px;
      .item-order{
        .order-info{
          position: relative;
          display: inline-block;
          margin-right: 248px;
          vertical-align: middle;
          padding-left: 130px;
          h2{
            font-size:24px;
            color:#333333;
            margin-bottom:20px;
          }
          p{
            color:#666666;
            span{
              color:#FF6700;
            }
          }
        }
        &:before{
          position: absolute;
          content: '';
          display: inline-block;
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background:url('/imgs/icon-gou.png') #80c58a no-repeat center;
          background-size:60px;
        }
      }
      .order-total {
        display: inline-block;
        vertical-align: middle;
        &>p:first-child{
          margin-bottom:30px;
        }
        span{
          font-size:28px;
          color:#FF6700;
        }
        .icon-down{
          display:inline-block;
          width:14px;
          height:10px;
          background:url('/imgs/icon-down.png') no-repeat center;
          background-size:contain;
          margin-left:9px;
          transition:all .5s;
          cursor:pointer;
          &.up{
            transform: rotate(180deg);
          }
        }
        .icon-up{
          transform: rotate(180deg);
        }
      }
      .item-detail{
          border-top: 1px solid #D7D7D7;
          padding-top: 47px;
          padding-left: 130px;
          font-size: 14px;
          margin-top: 45px;
          .item{
            margin-bottom:19px;
            .detail-title{
              float:left;
              width:100px;
            }
            .detail-info{
              display:inline-block;
              img{
                width: 30px;
                vertical-align: middle;
              }
            }
          }
        }
    }
    .item-pay{
      padding:26px 50px 72px;
      background-color:#ffffff;
      color: #333333;
      h3{
        font-size: 20px;
        font-weight: 200;
        color: #333333;
        padding-bottom: 24px;
        border-bottom: 1px solid #D7D7D7;
        margin-bottom: 26px;
      }
      .pay-way{
        font-size:18px;
        .pay{
          display:inline-block;
          width:188px;
          height:64px;
          border:1px solid #D7D7D7;
          cursor:pointer;
          &:last-child{
            margin-left:20px;
          }
          &.checked{
            border:1px solid #FF6700;
          }
        }
        .pay-ali{
          background:url('/imgs/pay/icon-ali.png') no-repeat center;
          background-size:103px 38px;
          margin-top:19px;
        }
        .pay-wechat{
          background:url('/imgs/pay/icon-wechat.png') no-repeat center;
          background-size:103px 38px;
        }
      }
    }
    .btn-wrap {
      text-align: right;
      margin-top: 20px;
    }
  }
}
</style>
