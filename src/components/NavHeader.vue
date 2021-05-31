<!--  -->
<template>
  <div class="header">
    <div class="nav-topbar">
      <div class="container">
        <div class="topbar-menu">
          <a href="javascript:;">小米商城</a>
          <a href="javascript:;">MUI</a>
          <a href="javascript:;">云服务</a>
          <a href="javascript:;">协议规则</a>
        </div>
        <div class="topbar-user">
          <a href="javascript:;" v-if="username">{{username}}</a>
          <a href="#/login" v-else>登录</a>
          <a href="/#/order/list">我的订单</a>
          <a href="javascript:;" class="my-cart" @click="goToCart"><span class="icon-cart"></span>购物车{{cartCount || '' }}</a>
        </div>
      </div>
    </div>
    <div class="nav-header">
      <div class="container">
        <div class="header-logo">
          <a href="/#/index"></a>
        </div>
        <div class="header-menu">
          <div class="item-menu">
            <span>小米手机</span>
            <div class="children">
              <ul>
                <li class="product" v-for="item in phoneList" :key="item.id">
                  <a :href="'/#/product/' + item.id" target="_self">
                    <div class="pro-img">
                      <img :src="item.mainImage" alt="item.name">
                    </div>
                    <div class="pro-name">{{item.name}}</div>
                    <div class="pro-price">{{item.price | currency}}</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="item-menu">
            <span>红米</span>
            <div class="children"></div>
          </div>
          <div class="item-menu">
            <span>电视</span>
            <div class="children"></div>
          </div>
        </div>
        <div class="header-search">
          <div class="wrapper">
            <input type="text" name="keyword">
            <a href="javascript:;"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nav-header',
  data() {
    return {
      phoneList: []
    }
  },
  created() {
    this.getCartCount();
    this.getProductList();
  },
  computed: {
    username() {
      return this.$store.state.username;
    },
    cartCount() {
      return this.$store.state.cartCount;
    }
  },
  filters: {
    currency(val) {
      if(!val) return '0.00';
      return `￥${val.toFixed(2)}元`
    }
  },
  methods: {
    getProductList() {
      this.axios.get('/products', {
        params:{
            categoryId:'100012',
            pageSize:6
          }
      }).then((res) => {
        this.phoneList = res.list;
      })
    },
    goToCart() {
      this.$router.push('/cart');
    },
    login() {
      this.$router.push('/login')
    },
    getCartCount() {
      this.axios.get('/carts/products/sum').then((res=0) => {
        this.$store.dispatch('saveCartCount', res);
      })
    }
  },
}

</script>
<style lang="scss" scoped>
  @import '../assets/scss/config.scss';
  @import '../assets/scss/mixin.scss';
  .header {
    .nav-topbar {
      height: 39px;
      line-height: 39px;
      background-color: #333333;
      color: #b0b0b0;
      .container {
        @include flex();
        a {
          display: inline-block;
          color: #b0b0b0;
          margin-right: 17px;
          &:last-child {
            margin-right: 0;
          }
        }
        .my-cart {
          width: 110px;
          background-color: #424242;
          text-align: center;
          color:#ffffff;
          font-size: 14px;
          .icon-cart {
            display: inline-block;
            width: 16px;
            height: 12px;
            background: url('/imgs/icon-cart.png') no-repeat center;
            background-size: contain;
            margin-right: 4px;
          }
        }
      }
    }
    .nav-header {
      .container {
        height: 112px;
        position: relative;
        @include flex();
        .header-menu {
          display: inline-block;
          width: 643px;
          padding-left: 209px;
          .item-menu {
            display: inline-block;
            color: #333333;
            font-weight: bold;
            line-height: 112px;
            font-size: 16px;
            padding: 0 10px;
            span {
              cursor: pointer;
            }
            &:hover {
              color: $colorA;
              .children {
                height: 220px;
                opacity: 1;
                z-index: 10;
              }
            }
            .children {
              position: absolute;
              top: 110px;
              left: 0px;
              width: 1226px;
              height: 0;
              opacity: 0;
              overflow: hidden;
              border-top: 1px solid #e5e5e5;
              box-shadow: 0px 7px 6px 0px rgba(0,0,0,.11);
              background: #ffffff;
              transition: all .5s;
              .product {
                position: relative;
                float: left;
                width: 16.6%;
                height: 220px;
                font-size: 12px;
                line-height: 12px;
                text-align: center;
                &:before {
                  content: '';
                  position: absolute;
                  top: 32px;
                  right: 0px;
                  padding: 50px 0;
                  border-left: 2px solid $colorF;
                }
                &:last-child::before {
                  border: none;
                }
                a {
                  display: inline-block;
                }
                img {
                  height: 111px;
                  width: auto;
                  margin-top: 26px;
                }
                .pro-img {
                  height: 137px;
                }
                .pro-name {
                  font-weight: bold;
                  margin-top: 19px;
                  margin-bottom: 8px;
                  color: $colorB;
                }
                .pro-price {
                  color: $colorB;
                }
              }
            }
          }
        }
        .header-search {
          width: 319px;
          .wrapper {
            height: 50px;
            border: 1px solid #e0e0e0;
            display: flex;
            align-items: center;
            input {
              border: none;
              border-right: 1px solid #e0e0e0;
              box-sizing: border-box;
              width: 264px;
              height: 50px;
              padding-left: 14px;
            }
            a {
              @include bgImg(55px, 18px, '/imgs/icon-search.png')
            }
          }
        }
      }
    }
  }
</style>
