<!-- 购物车 -->
<template>
  <div class="cart">
    <order-header :title="'我的购物车'">
      温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="cart-box">
          <ul class="cart-item-header">
            <li class="col-1"><label class="checkbox" :class="{'checked': allChecked}" @click="toggleAll"></label>全选</li>
            <li class="col-3">商品名称</li>
            <li class="col-1">单价</li>
            <li class="col-2">数量</li>
            <li class="col-1">小计</li>
            <li class="col-1">操作</li>
          </ul>
          <ul class="cart-item-list">
            <li class="cart-item" v-for="(item, index) in list" :key="index">
              <div class="item-check col-1">
                <span class="checkbox" :class="{'checked': item.productSelected}" @click="updateCart(item, 3)"></span>
              </div>
              <div class="item-name col-3">
                <img v-lazy="item.productMainImage" alt="">
                <span>{{`${item.productName}，${item.productSubtitle}`}}</span>
              </div>
              <div class="item-price col-1">{{item.productPrice}}</div>
              <div class="item-num col-2">
                <div class="num-box">
                  <a href="javascript:;" @click="updateCart(item, 1)">-</a>
                  <span>{{item.quantity}}</span>
                  <a href="javascript:;" @click="updateCart(item, 2)">+</a>
                </div>
              </div>
              <div class="item-total col-1">{{item.productTotalPrice}}元</div>
              <a href="javascript:;" class="item-del col-1" @click="sureDel(item)"></a>
            </li>
          </ul>
        </div>
        <div class="order-wrap">
          <div class="cart-tip">
            <a href="/">继续购物</a>
            共<span>{{list.length}}</span>件商品，已选择<span>{{checkNum}}</span>件
          </div>
          <div class="total">
            合计：<span>{{cartTotalPrice}}</span>元
            <a href="javascript:;" class="btn" @click="order">去结算</a>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
    <modal
      title="提示"
      sureText="删除"
      btnType="3"
      modalType="middle"
      :showModal="showModal"
      @submit="delProduct"
      @cancel="showModal = false"
    >
    <template v-slot:body>
      确定要删除{{deleteProduct.productName}}吗？
    </template>
    </modal>
  </div>
</template>

<script>
import NavFooter from '../components/NavFooter'
import OrderHeader from '../components/OrderHeader'
import ServiceBar from '../components/ServiceBar'
import Modal from '../components/Modal'
export default {
  name: 'cart',
  data() {
    return {
      list: [],
      allChecked: false,
      cartTotalPrice: 0,
      checkNum: 0,
      showModal: false,
      deleteProduct: {}
    }
  },
  components: {
    NavFooter,
    OrderHeader,
    ServiceBar,
    Modal
  },
  compute: {
  },
  watch: {},
  created() {
    this.getCartList();
  },
  mounted() {},
  methods: {
    getCartList() {
      this.axios.get('./carts').then((res) => {
       this.handleList(res);
      })
    },
    updateCart(item, type) {
      let quantity = item.quantity,
          selected = item.productSelected;
      if (type==1) {
        if (quantity == 1) {
          this.$message.warning('商品至少保留一件');
          return
        }
        quantity--;
      } else if(type==2) {
        if(quantity>=item.productStock) {
          this.$message.warning('商品不能超过库存数量');
          return
        }
        quantity++;
      } else {
        selected = !selected
      }
      item.quantity = quantity;
      item.productSelected = selected;
      this.axios.put(`carts/${item.productId}`, {
        quantity,
        selected
      }).then((res) => {
        this.handleList(res);
      });
    },
    toggleAll() {
      let url = this.allChecked ? '/carts/unSelectAll' : '/carts/selectAll';
      this.axios.put(url).then((res) => {
        this.handleList(res);
      })
    },
    sureDel(item) {
      this.deleteProduct = item;
      this.showModal = true;
    },
    delProduct() {
      this.axios.delete(`/carts/${this.deleteProduct.productId}`).then((res) => {
        this.handleList(res);
        this.showModal = false;
        this.$message.success('删除成功');
      })
    },
    order() {
      let isCheck = this.list.every(item => !item.productSelected);
      if(isCheck) {
        this.$message.warning('请选择一件商品');
        return;
      }
      this.$router.push('/order/confirm');
    },
    handleList(res) {
      this.list = res.cartProductVoList || [];
      this.allChecked = res.selectedAll;
      this.cartTotalPrice = res.cartTotalPrice;
      this.checkNum = this.list.filter(item => item.productSelected).length;
    }
  }
}
</script>

<style lang="scss" scoped>
.cart {
  .wrapper{
    background: #f5f5f5;
    padding-top: 30px;
    padding-bottom: 114px;
    .cart-box{
      background: #fff;
      font-size: 14px;
      color: #999;
      text-align: center;
      .checkbox {
        display: inline-block;
        width: 22px;
        height: 22px;
        border: 1px solid #e5e5e5;
        vertical-align: middle;
        margin-right: 17px;
        cursor: pointer;
        &.checked{
          background: url('/imgs/icon-gou.png') #ff6600 no-repeat center;
          background-size: 16px 12px;
          border: none;
        }
      }
      .cart-item-header {
        display: flex;
        li {
          line-height: 44px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .cart-item-list{
        .cart-item {
          display: flex;
          align-items: center;
          height: 125px;
          border-top: 1px solid #e5e5e5;
          font-size: 16px;
          .item-name{
            font-size: 18px;
            color: #333;
            overflow:hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            img{
              width: 80px;
              height: 80px;
              vertical-align: middle;
            }
            span{
              margin-left: 30px;
            }
          }
          .item-price{
            color: #333;
          }
          .item-num{
            .num-box{
              display: inline-block;
              width: 150px;
              height: 40px;
              line-height: 40px;
              border: 1px solid #e5e5e5;
              font-size:14px;
              a{
                display: inline-block;
                width: 50px;
                color: #333;
              }
              span {
                display: inline-block;
                width: 50px;
                color: #333;
              }
            }
          }
          .item-total{
            color: #ff6600;
          }
          .item-del{
            display: inline-block;
            width: 14pd;
            height: 12px;
            background: url('/imgs/icon-close.png') no-repeat center;
            background-size: contain;
          }
        }
      }
    }
    .order-wrap {
      font-size: 14px;
      color: #666;
      margin-top: 20px;
      line-height: 50px;
      overflow: hidden;
      .cart-tip {
        float: left;
        margin-left: 29px;
        a{
          color: #666;
          margin-right: 37px;
        }
        span{
          color: #ff6600;
          margin:0 5px;
        }
      }
      .total{
        float: right;
        font-size: 14px;
        color: #ff6600;
        span{
          font-size: 24px;
        }
        a{
          width: 202px;
          height: 50px;
          line-height: 50px;
          font-size: 18px;
          margin-left: 37px;
        }
      }
    }

  }
}

</style>
