<!--  -->
<template>
  <div class="footer">
    <div class="footer-logo">
      <img src="/imgs/logo-footer.png" alt="">
      <p>小米商城</p>
    </div>
    <div class="footer-link">
      <a href="" target="_blank">河畔一角主页</a>
      <a href="" target="_blank">河畔一角主页</a>
      <a href="" target="_blank">河畔一角主页</a>
      <a href="" target="_blank">河畔一角主页</a>
      <a href="" target="_blank">河畔一角主页</a>
    </div>
    <div class="copyright">© mi.com 京ICP证110507号</div>
  </div>
</template>

<script>
export default {
  name: 'nav-footer',
  data() {
    return {
    }
  },
  created() {},
  components: {},
  watch: {},
  computed: {},
  mounted() {},
  methods: {}
}

</script>
<style lang="scss" scoped>
  .footer {
    height: 234px;
    border-top: 4px solid #ff6600;
    background: #333333;
    color: #999999;
    font-size: 16px;
    text-align: center;
    .footer-logo {
      margin-top: 46px;
      margin-bottom: 31px;
      img {
        width: 53px;
        height: 36px;
        margin-bottom: 13px;
      }
    }
    .footer-link {
      a {
        color: #999999;
        padding: 0 15px;
        &:after {
          content: '|';
          position: relative;
          left: 15px;
        }
        &:last-child {
          padding-right: 0;
          &:after {
            content: '';
            left: 0;
          }
        }
      }
    }
    .copyright {
      margin-top: 13px;
    }
  }
</style>
