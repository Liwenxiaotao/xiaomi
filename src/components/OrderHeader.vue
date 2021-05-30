<!--  -->
<template>
  <div class="order-header">
    <div class="container">
      <div class="header-logo">
        <a href="/#/index"></a>
      </div>
       <div class="title">
        <h2>{{title}} <span><slot></slot></span></h2>
      </div>
      <div class="username">
        <a href="javascript:;">{{username}}</a>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
  name: 'order-header',
  props: {
    title: String,
  },
  data() {
    return {
    }
  },
  components: {
  },
  computed: {
    ...mapState(['username'])
  },
  watch: {},
  created() {},
  mounted() {
    console.log(this.title)
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.order-header {
  padding: 30px 0;
  overflow: hidden;
  .header-logo {
    float: left;
  }
  .title,.username{
    display: inline-block;
    height: 55px;
    line-height: 55px;
  }
  .title{
    float: left;
    color: #333;
    margin-left: 50px;
    h2{
      font-size: 28px;
    }
    span{
      font-size: 14px;
      margin-left: 17px;
      color: #999;
      font-weight: 200;
    }
  }
  .username{
    float: right;
    a{
      color: #666;
      font-size: 16px;
    }
  }
}
</style>
