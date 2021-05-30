<!--  -->
<template>
  <div>
    <product-param :title="product.name">
      <template v-slot:buy>
        <button class="btn" @click="buy">立即购买</button>
      </template>
    </product-param>
     <div class="item-video">
        <h2>60帧超慢动作摄影<br/>慢慢回味每一瞬间的精彩</h2>
        <p>后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！<br/>更能AI 精准分析视频内容，15个场景智能匹配背景音效。</p>
        <div class="video-bg" @click="showSlide=true"></div>
        <div class="video-box">
          <div class="overlay" v-if="showSlide"></div>
          <div class="video" :class="{'slide': showSlide}">
            <span class="icon-close" @click="showSlide=false"></span>
            <video src="/imgs/product/video.mp4" muted autoplay controls="controls"></video>
          </div>
        </div>
      </div>
      <div class="test">
        test
      </div>
  </div>
</template>

<script>
import ProductParam from '../components/ProductParam'
export default {
  name: 'product',
  data() {
    return {
      showSlide: false,
      product: {
        name: '',
      },
    }
  },
  components: {
    ProductParam,
  },
  computed: {},
  watch: {},
  created() {
    this.getProductInfo();
  },
  mounted() {},
  methods: {
    getProductInfo() {
      let id = this.$route.params.id;
      this.axios.get(`/products/${id}`).then((res) => {
        this.product = res;
      })
    },
    buy() {
      const id = this.$route.params.id;
      this.$router.push(`/detail/${id}`);
    }
  }
}
</script>

<style lang="scss" scoped>
.item-video{
  height:1044px;
  background-color:#070708;
  margin-bottom:76px;
  color:#FFFFFF;
  text-align:center;
  h2{
    font-size:60px;
    padding-top:82px;
    margin-bottom:47px;
  }
  p{
    font-size:24px;
    margin-bottom:58px;
  }
  .video-bg{
    background:url('/imgs/product/gallery-1.png') no-repeat center;
    background-size:cover;
    width:1226px;
    height:540px;
    margin:0 auto 120px;
    cursor:pointer;
  }
  .video-box {
    .overlay{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #333;
      opacity: .5;
    }
    .video{
      position: fixed;
      top: -50%;
      left: 50%;
      width: 1000px;
      transform: translate(-50%, -50%);
      opacity: 0;
      z-index: 10;
      transition: all .6s;
      &.slide{
        top: 50%;
        opacity: 1;
      }
      .icon-close {
        position: absolute;
        top: 20px;
        right: 20px;
        display: inline-block;
        width: 24px;
        height: 24px;
        background: url('/imgs/icon-close.png');
        cursor: pointer;
        z-index: 11;
      }
      video {
        width: 100%;
      }
    }
  }
}
.test{
  display: inline-block;
  margin-right:-100px;
  width: 20px;
  color: #ff0000;
  font-size: 20px;
  overflow: hidden;
}
</style>
