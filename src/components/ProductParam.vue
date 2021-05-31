<!--  -->
<template>
  <div style="height: 70px;">
    <div class="nav-bar" :class="{'is-fixed': isFixed}">
      <div class="container">
        <div class="pro-title">
          {{title}}
        </div>
        <div class="pro-param">
          <a href="javascript:;">概述</a><span>|</span>
          <a href="javascript:;">参数</a><span>|</span>
          <a href="javascript:;">用户评价</a>
          <slot name="buy"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nav-bar',
  props: {
    title: String,
  },
  data() {
    return {
      isFixed: false
    }
  },
  components: {},
  computed: {},
  watch: {},
  created() {},
  mounted() {
    window.addEventListener('scroll', this.initHeight)
  },
  methods: {
    initHeight() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      this.isFixed = scrollTop > 150 ? true : false;
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.initHeight);
  }
 }
</script>

<style lang="scss" scoped>
@import '../assets/scss/config.scss';
@import '../assets/scss/mixin.scss';
  .nav-bar {
    height: 70px;
    line-height: 70px;
    border-top: 1px solid #e5e5e5;
    background: #fff;
    &.is-fixed {
      position: fixed;
      top: 0;
      width: 100%;
      box-shadow: 0 5px 5px #ccc;
      z-index: 10;
    }
    .container{
      @include flex();
      .pro-title {
        font-size: $fontH;
        color: $colorB;
        font-weight: bold;
      }
      .pro-param {
          font-size: $fontJ;
          a {
            color: $colorC;
            &:last-of-type {
              margin-right: 11px;
            }
          }
          span {
            margin: 0 10px;
          }
        }
    }
  }
</style>
