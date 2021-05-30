<!-- 登录页 -->
<template>
  <div class="login">
    <div class="container">
      <a href="/#/index">
        <img src="/imgs/login-logo.png" alt="">
      </a>
    </div>
    <div class="wrapper">
      <div class="login-form">
        <h3>
          <span class="checked">账号登录</span><span class="spe-line">|</span><span>扫码登录</span>
        </h3>
        <div class="input">
          <input type="text" placeholder="请输入账号" v-model="username">
        </div>
        <div class="input">
          <input type="password" placeholder="请输入密码" v-model="password">
        </div>
        <div class="btn-box">
          <a href="javascript:;" class="btn" @click="login">登录</a>
        </div>
        <div class="tips">
          <a href="javascript:;" class="sms">手机短信登录/注册</a>
          <span>
            <a href="javascript:;" class="reg" @click="register">立即注册<span>|</span></a><a href="javascript:;" class="forget">忘记密码</a>
          </span>
        </div>
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      username: '',
      password: '',
      userId: '',
    }
  },
  components: {},
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    login() {
      let {username, password} = this;
      this.axios.post('/user/login', {
        username,
        password,
      }).then((res) => {
        this.$cookie.set('userId', res.id, {expires: 'Session'});
        this.$store.dispatch('saveUsername', res.username);
        this.$router.push('/index');
      })
    },
    register() {
      this.axios.post('/user/register', {
        username:'tao12',
        password: 'tao12',
        email: 'tao12@163.com'
      }).then(() => {
        this.$message.success('注册成功');
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .login{
    &>.container {
      height: 113px;
      img {
        height: 100%;
        width: auto;
      }
    }
    .wrapper {
      position: relative;
      height: 576px;
      background: url('/imgs/login-bg.jpg') no-repeat center;
      .login-form {
        position: absolute;
        height:510px;
        width: 410px;
        padding: 0 31px;
        box-sizing: border-box;
        background: #fff;
        right: 30px;
        bottom: 29px;
        h3 {
          text-align: center;
          line-height: 24px;
          font-size: 24px;
          margin: 40px auto 49px;
          .checked {
            color: #ff6600;
          }
          .spe-line {
            margin: 0 32px;
          }
        }
        .input {
          height: 50px;
          border: 1px solid #e5e5e5;
          margin-bottom: 20px;
          input {
            width: 100%;
            height: 100%;
            border: none;
            box-sizing: border-box;
            outline: none;
            padding: 18px;
          }
        }
        .btn-box {
          .btn {
            width: 100%;
            line-height: 50px;
            margin-top: 10px;
            font-size: 16px;
          }
        }
        .tips {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          margin-top: 14px;
          .sms {
            color: #ff6600;
          }
          .reg, .forget{
            color: #999;
            span {
              margin: 0 7px;
            }
          }
        }
      }
    }
  }
</style>
