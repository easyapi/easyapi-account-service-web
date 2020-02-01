<template>
  <div class="sms-login-container">
    <div class="lg-img">
      <img v-if="showDisabled" src="https://qiniu.easyapi.com/default/fapiao_logo.png">
      <img v-else :src="img" alt="">
    </div>
    <div class="form-content">
      <van-field
        v-model="formData.mobile"
        type="tel"
        placeholder="请输入手机号码">
        <!--<van-icon slot="left-icon" size="17px" :name="phoneIcon"/>-->
      </van-field>
      <van-field
        v-model="formData.identifyCode"
        placeholder="请输入验证码">
        <!--<van-icon slot="left-icon" size="16px" :name="pwdIcon"/>-->
        <span slot="button" class="fz-cl-blue" @click="sendSMS">{{btnTxt}}</span>
      </van-field>
      <div class="btn-box">
        <button @click="submit">登录</button>
      </div>
      <div class="other">
        <span @click="jumpPage('/register')">注册新号</span>
        <span @click="jumpPage('/login')">密码登录</span>
      </div>
    </div>
  </div>
</template>
<script>
  import phoneIcon from '../assets/images/phone_icon.png'
  import pwdIcon from '../assets/images/pwd_icon.png'
  import {captchaUrl, authenticationCodeLogonUrl} from '../api/api'

  export default {
    name: '',
    components: {},
    props: {},
    data() {
      return {
        showDisabled: true,
        phoneIcon: phoneIcon,
        pwdIcon: pwdIcon,
        img: '',
        appKey: '',
        formData: {
          mobile: null,
          identifyCode: '',
        },
        btnTxt: '发送验证码',
        time: 60,
        disBtn: false,
      }
    },

    //方法
    methods: {
      setCookie(token, exdays) {
        var exdate = new Date();
        exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays);//保存天数
        window.document.cookie = "authenticationToken" + "=" + token + ";path=/;expires=" + exdate.toGMTString();
      },
      submit() {
        if (!this.formData.mobile || this.formData.mobile.length !== 11) {
          return this.$toast("手机号格式错误")
        }
        if (!this.formData.identifyCode) {
          return this.$toast("请输入验证码")
        }
        this.getToKen()
      },
      //1.获取验证码
      sendSMS() {
        if (this.disBtn) {
          return
        }
        if (!this.formData.mobile || this.formData.mobile.length !== 11) {
          return this.$toast("手机号码格式错误")
        }
        this.$ajax.post(captchaUrl, {
          data: {
            'mobile': this.formData.mobile,
            appKey: this.appKey
          },
        }).then((res) => {
          this.$toast("获取成功");
          this.disBtn = true;
          this.showDisabled = false,
            this.countTime();
        }).catch(error => {
          this.$toast("发送失败")
        });
      },
      //2.倒计时
      countTime: function () {
        let _that = this;
        if (this.time > 0) {
          this.time -= 1;
          this.btnTxt = this.time + '秒后重发';
          setTimeout(_that.countTime, 1000)
        } else {
          this.time = 60;
          this.btnTxt = "发送验证码";
          this.disBtn = false;
        }
      },
      //获取Token
      getToKen() {
        this.$ajax.post(authenticationCodeLogonUrl, {
          data: {
            appKey: this.appKey,
            username: this.formData.mobile,
            code: this.formData.identifyCode,
            rememberMe: true
          }
        }).then(res => {
          let arr = res.data.id_token.split(" ")
          this.setCookie(arr[1], 30)
          let url = res.data.login_success_url
          localStorage.setItem("LuJin", url);
          window.location.href = 'https://account-service-web.easyapi.com/?appKey=' + this.appKey
        }).catch(error => {
          console.log(error)
        });
      },
      jumpPage(url) {
        this.$router.push({path: url})
      }
    },
    created() {
      this.appKey = localStorage.getItem("appKey");
      this.img = localStorage.getItem("logoImg");
    },
    mounted() {

    },
    //keep-alive 组件激活时调用
    activated() {

    },
    //keep-alive 组件停用时调用。
    deactivated() {

    },
    //计算属性
    computed: {},
    watch: {}
  }
</script>
<style scoped lang="stylus">

</style>
