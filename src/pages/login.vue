<template>
  <div class="login-container">
    <div class="lg-img">
      <img v-if="showDisabled" src="https://qiniu.easyapi.com/default/fapiao_logo.png">
      <img v-else :src="img">
    </div>
    <div class="form-content">
      <van-field
        v-model="formData.mobile"
        type="tel"
        placeholder="请输入手机号码">
        <!--<van-icon slot="left-icon" size="17px" :name="phoneIcon"/>-->
      </van-field>
      <van-field
        v-model="formData.password"
        type="password"
        placeholder="请输入密码"
        style="background-color: #FFFFFF!important;">
        <!--<van-icon slot="left-icon" size="16px" :name="pwdIcon"/>-->
        <span slot="button" class="fz-cl-blue" @click="jumpPage('/forget-password')">忘记密码?</span>
      </van-field>
      <div class="btn-box">
        <button @click="submit">登录</button>
      </div>
      <div class="other">
        <span @click="jumpPage('/signup')">注册新号</span>
        <span @click="jumpPage('/captcha-login')">验证码登录</span>
      </div>
    </div>
  </div>
</template>
<script>

  import Cookies from 'js-cookie'
  import phoneIcon from '../assets/images/phone_icon.png'
  import pwdIcon from '../assets/images/pwd_icon.png'
  import {passwordLoginUrl, logourl} from '../api/api'
  import {login} from '../api/account'

  export default {
    name: '',
    components: {},
    props: {},
    data() {
      return {
        showDisabled: true,
        img: '',
        appKey: '',
        accessToken: '',
        phoneIcon: phoneIcon,
        pwdIcon: pwdIcon,
        username: '',
        formData: {
          mobile: null,
          password: '',
          judgeToken: '',
          LuJin: '',
        },
      }
    },
    //keep-alive 组件激活时调用
    activated() {

    },
    //keep-alive 组件停用时调用。
    deactivated() {

    },
    methods: {
      submit() {
        if (!this.formData.mobile || this.formData.mobile.length !== 11) {
          return this.$toast("手机号格式错误")
        }
        if (!this.formData.password) {
          return this.$toast("请输入密码")
        } else {
          this.getToKen()
        }
      },

      //获取Token
      getToKen() {
        let data = {
          'appKey': this.appKey,
          username: this.formData.mobile,
          password: this.formData.password,
          rememberMe: true
        }
        login(data).then(res => {
          let arr = res.data.id_token.split(" ")
          Cookies.set('authenticationToken', arr[1], 30)
          localStorage.setItem("authenticationToken", arr[1]);
          let url = res.data.login_success_url
          localStorage.setItem("LuJin", url);
          localStorage.setItem("username", this.formData.mobile);
          window.location.href = 'https://account-service-web.easyapi.com/?appKey=' + this.appKey
        }).catch(error => {
          console.log(error)
          this.$toast("请检查账号，密码");
        });
      },
      //获取logo
      getlogo() {
        this.$ajax.get(logourl + '?appKey=' + this.appKey, {}).then(res => {
          this.img = res.data.content
          this.showDisabled = false;
          localStorage.setItem("logoImg", res.data.content);
        }).catch(error => {
          console.log(error)
        });
      },
      jumpPage(url) {
        this.$router.push({path: url})
      }
    },
    mounted() {
      this.getlogo()
    },
    created() {
      this.formData.mobile = localStorage.getItem("username");
      this.LuJin = localStorage.getItem("LuJin");
      if (!this.$route.query.appKey) {
        this.appKey = localStorage.getItem("appKey");
      } else {
        this.appKey = this.$route.query.appKey;
        localStorage.setItem("appKey", this.appKey);
      }
      this.token = localStorage.getItem("authenticationToken");
      if (this.token) {
        // window.location.href='https://account-service-web.easyapi.com/?appKey='+ this.appKey
      }
    },
    computed: {},
    watch: {}
  }
</script>
<style scoped lang="stylus">

</style>
