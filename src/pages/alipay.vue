<!-- 支付宝 -->
<template>
  <div class="ali-pay">
    <div class="form" v-html="content"></div>
    <loading v-if="loading"></loading>
  </div>
</template>

<script>
import Loading from '../components/Loading'
export default {
  name: '',
  data() {
    return {
      orderId: this.$route.query.orderNo,
      content:'',
      loading: true
    }
  },
  components: {
    Loading,
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.paySubmit()
  },
  methods: {
    paySubmit() {
      this.axios.post('/pay', {
        orderId: this.orderId,
        orderName: '模拟支付宝',
        amount: 0.01,
        payType: 1
      }).then((res) => {
        this.content = res.content;
        setTimeout(() => {
          document.forms[0].submit();
        },100)
      })
    }
  }
}
</script>

<style lang scoped>

</style>
