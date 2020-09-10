<template>
  <div class="register-container">
    <div class="form-content">
      <div class="lg-img">
        <img v-if="showDisabled" src="https://qiniu.easyapi.com/default/fapiao_logo.png">
        <img v-else :src="img">
      </div>
      <van-field v-model="formData.mobile" class="input" type="tel" placeholder="请输入手机号码"/>
      <van-field v-model="formData.name" class="input" placeholder="请输入昵称"/>
      <van-field type="password" v-model="formData.password" class="input" placeholder="设置密码"/>
      <!--<van-field  type="password"  v-model="formData.password2" placeholder="确认密码" @blur="onBlur" :error-message="errorPwdMsg"/>-->
      <van-field
        class="input"
        v-model="formData.code"
        center
        clearable
        placeholder="请输入验证码">
        <span slot="button" v-if="disBtn" :disabled="disBtn" class="fz-cl-blue" @click="sendSMS">{{btnTxt}}</span>
        <span slot="button" v-else disBtn class="fz-cl-blue">{{btnTxt}}</span>
      </van-field>
      <div class="btn-box">
        <button @click="submit" v-if="disabled">注册</button>
        <button v-else disabled>注册</button>
      </div>
      <div class="other">
        <span @click="jumpPage('/login')">已有账号，立即登录</span>
      </div>

    </div>

  </div>
</template>
<script>
  import {captchaUrl, registerUrl} from '../api/api'

  export default {
    name: '',
    components: {},
    props: {},
    data() {
      return {
        showDisabled: true,
        logoUrl: '',
        openid: '',
        img: '',
        appKey: '',
        formData: {
          mobile: null,
          name: '',
          password: '',
          password2: '',
          code: '',
        },
        errorPwdMsg: '',
        btnTxt: '发送验证码',
        time: 60,
        disBtn: true,
        disabled: true,
      }
    },

    //方法
    methods: {
      submit() {
        this.disabled = false;
        if (!this.formData.mobile || this.formData.mobile.length !== 11) {
          return this.$toast("手机号格式错误")
        } else if (!this.formData.name) {
          return this.$toast("请输入昵称")
        } else if (!this.formData.password) {
          return this.$toast("请输入密码")
        } else if (!this.formData.code) {
          return this.$toast("请输入验证码")
        } else {
          this.$ajax.post(registerUrl, {
            data: {
              code: this.formData.code,
              username: this.formData.mobile,
              password: this.formData.password,
              nickname: this.formData.name,
              appKey: this.appKey
            }
          }).then(res => {
            this.$toast("注册成功");
            this.disabled = true;
            setTimeout(() => {
              this.$router.push('/login?appKey=' + this.appKey)
            }, 1200)
          }).catch(error => {
            console.log(error)
          });
        }
      },
      //1.获取验证码
      sendSMS() {
        this.disBtn = false;
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
          this.disBtn = false;
          this.showDisabled = false;
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
          this.disBtn = true;
        }
      },
      jumpPage(url) {
        this.$router.push({path: url,})
      }
    },
    mounted() {
//      this.getOpenId();
    },
    activated() {
    },
    deactivated() {
    },
    created() {
      this.appKey = localStorage.getItem("appKey");
      this.img = localStorage.getItem("logoImg");
    },
    //计算属性
    computed: {},
    watch: {}
  }
</script>
<style scoped lang="stylus">
  .input {
    padding 15px 10px;
  }
</style>
