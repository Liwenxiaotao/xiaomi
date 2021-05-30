<!--  -->
<template>
  <div class="index">
    <div class="container">
      <div class="swiper-box">
        <div class="nav-menu">
          <ul class="menu-wrap">
            <li class="menu-item">
              <a href="javascript:;">手机 电话卡1</a>
              <div class="children">
                <ul v-for="(item, index) in menuList" :key="index">
                  <li v-for="sub in item" :key="sub.id">
                    <a :href="sub ? '/#/product/'+sub.id : ''">
                      <img :src="sub ? sub.img : '/imgs/item-box-1.png'">
                      {{sub ? sub.name : '小米9cc'}}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">手机 电话卡2</a>

            </li>
            <li class="menu-item">
              <a href="javascript:;">手机 电话卡3</a>

            </li>
            <li class="menu-item">
              <a href="javascript:;">手机 电话卡4</a>

            </li>
            <li class="menu-item">
              <a href="javascript:;">手机 电话卡5</a>

            </li>
            <li class="menu-item">
              <a href="javascript:;">手机 电话卡6</a>

            </li>
            <li class="menu-item">
              <a href="javascript:;">手机 电话卡7</a>

            </li>
            <li class="menu-item">
              <a href="javascript:;">手机 电话卡8</a>

            </li>
          </ul>
        </div>
        <div class="swiper">
          <swiper :options="swiperOption">
            <swiper-slide v-for="(item, index) in slideList" :key="index">
              <a :href="'/#/product/'+item.id">
                <img :src="item.img" alt="">
              </a>
            </swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </swiper>
        </div>

      </div>
      <div class="ads-box">
        <a :href="'/#/product/'+item.id" v-for="(item, index) in adsList" :key="index">
          <img v-lazy="item.img" alt="">
        </a>
      </div>
      <div class="banner-box">
        <a href="/#/product/33">
          <img v-lazy="'/imgs/banner-1.png'" alt="">
        </a>
      </div>
    </div>
    <div class="product-box">
      <div class="container">
        <h2>手机</h2>
        <div class="wrapper">
          <div class="banner-left">
            <a href="/#/product/35">
              <img v-lazy="'/imgs/mix-alpha.jpg'" alt="">
            </a>
          </div>
          <div class="list-box">
            <div class="list" v-for="(arr,i) in phoneList" :key="i">
              <div class="item" v-for="(item,j) in arr" :key="j">
                <span :class="j%2===0 ? 'new-pro' : 'kill-pro'">新品</span>
                <div class="item-img">
                  <img v-lazy="item.mainImage" alt="">
                </div>
                <div class="item-info">
                  <h3>{{item.name}}</h3>
                  <p>{{item.subtitle}}</p>
                  <p class="price" @click="addCart(item.id)">{{item.price}}元</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <modal
      title="提示"
      sureText="查看购物车"
      btnType="1"
      modalType="middle"
      :showModal="showModal"
      @submit="goToCart"
      @cancel="showModal = false"
    >
      <template v-slot:body>
        <p>商品添加成功！</p>
      </template>
    </modal>
  </div>
</template>

<script>
import ServiceBar from '../components/ServiceBar.vue'
import Modal from '../components/Modal.vue'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  name: 'index',
  data() {
    return {
      swiperOption: {
        autoplay: true,
        loop: true,
        effect: 'cube',
        cubeEffect: {
          shadowOffset: 100,
          shadowScale: 0.6
        },
        pagination: {
          el: '.swiper-pagination',
          clickable:true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
      },
      slideList:[
        {
          id:'42',
          img:'/imgs/slider/slide-1.jpg'
        },
        {
          id:'45',
          img:'/imgs/slider/slide-2.jpg'
        },
        {
          id:'46',
          img:'/imgs/slider/slide-3.jpg'
        },
        {
          id:'',
          img:'/imgs/slider/slide-4.jpg'
        }
      ],
      menuList:[
        [
          {
            id:30,
            img:'/imgs/item-box-1.png',
            name:'小米CC9',
          },{
            id:31,
            img:'/imgs/item-box-2.png',
            name:'小米8青春版',
          },{
            id:32,
            img:'/imgs/item-box-3.jpg',
            name:'Redmi K20 Pro',
          },{
            id:33,
            img:'/imgs/item-box-4.jpg',
            name:'移动4G专区',
          }
        ],
        [0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]
      ],
      adsList:[
        {
          id:33,
          img:'/imgs/ads/ads-1.png'
        },{
          id:48,
          img:'/imgs/ads/ads-2.jpg'
        },{
          id:45,
          img:'/imgs/ads/ads-3.png'
        },{
          id:47,
          img:'/imgs/ads/ads-4.jpg'
        }
      ],
      phoneList:[],
      showModal: false,
    }
  },
  components: {
    ServiceBar,
    Swiper,
    SwiperSlide,
    Modal,
  },
  computed: {},
  watch: {},
  created() {
    this.init();
  },
  mounted() {},
  methods: {
    init() {
      this.axios.get('/products', {
        params: {
          categoryId:100012,
          pageSize:14
        }
      }).then((res) => {
        res.list = res.list.slice(6, 14);
        this.phoneList = [res.list.slice(0,4), res.list.slice(4,8)];
        console.log(this.phoneList);
      })
    },
    addCart(id) {
      this.axios.post('/carts', {
        productId: id,
        selected: true
      }).then((res) => {
        this.$store.dispatch('saveCartCount', res.cartTotalQuantity);
        this.showModal = true;
      }).catch(() => {
        this.showModal = true;
      })
    },
    goToCart() {
      this.showModal = false;
      this.$router.push('/cart');
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/mixin.scss';
@import '../assets/scss/config.scss';
  .index{
    .swiper-box{
      position: relative;
      .nav-menu{
        position: absolute;
        width: 264px;
        height: 100%;
        z-index: 9;
        padding: 26px 0;
        background: #55585a7a;
        box-sizing: border-box;
        .menu-wrap {
          .menu-item {
            height: 50px;
            line-height: 50px;
            a{
              position: relative;
              display: block;
              font-size: 16px;
              color: #fff;
              padding-left: 30px;
              &:after{
                position: absolute;
                right: 30px;
                top: 17.5px;
                content: ' ';
                @include bgImg(10px, 15px, '/imgs/icon-arrow.png');
              }
            }
            &:hover{
              background: $colorA;
              .children{
                display: block;
              }
            }
            .children {
              display: none;
              position: absolute;
              width: 962px;
              height: 100%;
              background: $colorG;
              left: 264px;
              top: 0;
              border:1px solid $colorH;
              ul {
                display: flex;
                justify-content: space-between;
                height: 75px;
                li {
                  height: 75px;
                  line-height: 75px;
                  width: 241px;
                  padding-left: 23px;
                }
                a {
                  color: $colorB;
                  font-size: 14px;
                }
                img{
                  width: 42px;
                  height: 32px;
                  vertical-align: middle;
                  margin-right: 15px;
                }
              }
            }
          }
        }
      }
      .swiper {
          width: 1226px;
          border: none;
        .swiper-container {
          .swiper-button-prev {
            left: 274px;
          }
          img {
            width: 100%;
          }
        }
      }

    }
    .ads-box {
      @include flex();
      margin-top: 14px;
      margin-bottom: 32px;
      a {
        width: 286px;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .banner-box {
      margin-bottom: 15px;
      a {
        img {
          width: 100%;
        }
      }
    }
    .product-box {
      background: $colorJ;
      padding: 30px 0 50px;
      h2 {
        font-size:$fontF;
        height:21px;
        line-height:21px;
        color:$colorB;
        margin-bottom:20px;
      }
      .wrapper {
        display: flex;
        justify-content: space-between;
        width: 100%;
        .banner-left {
          width: 224px;
          margin-right: 16px;
          img {
            width: 100%;
          }
        }
        .list-box {
          flex: 1;
          background-color:$colorG;
          .list {
            .item {
              display: inline-block;
              width: 25%;
              text-align: center;
              span{
                position:relative;
                top: 10px;
                display: inline-block;
                width: 67px;
                height: 24px;
                font-size: 14px;
                line-height: 24px;
                color:$colorG;
                &.new-pro{
                  background-color:#7ECF68;
                }
                &.kill-pro{
                  background-color:#E82626;
                }
              }
              .item-img {
                img {
                  height:180px;
                }
              }
              .item-info{
                h3 {
                  font-size: $fontJ;
                  color: $colorB;
                  line-height: $fontJ;
                  font-weight: bold;
                }
                p {
                  color: $colorD;
                  line-height: 13px;
                  margin: 6px auto 13px;
                }
                .price {
                  color: #f20a0a;
                  font-size: $fontJ;
                  font-weight: bold;
                  cursor: pointer;
                  &:after {
                    @include bgImg(22px, 22px, '/imgs/icon-cart-hover.png');
                    content: '';
                    margin-left: 5px;
                    vertical-align: middle;
                  }
                }
              }
            }
          }
        }
      }

    }
  }
</style>
