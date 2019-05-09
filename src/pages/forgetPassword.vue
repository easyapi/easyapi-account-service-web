<template>
  <div class="register-container">
    <div class="page-title">忘记密码</div>
    <div class="form-content">
      <van-field v-model="formData.mobile" class="input" type="tel" placeholder="请输入手机号码"/>
      <van-field
        class="input"
        v-model="formData.code"
        center
        clearable
        placeholder="请输入验证码">
        <span slot="button" v-if="disBtn" :disabled="disBtn" class="fz-cl-blue" @click="sendSMS">{{btnTxt}}</span>
        <span slot="button" v-else disBtn class="fz-cl-blue">{{btnTxt}}</span>
      </van-field>
      <van-field type="password" v-model="formData.newPassword" class="input" placeholder="请输入6~20位，字母或者数字密码"/>
      <van-field type="password" v-model="formData.confirmPassword" class="input" placeholder="请再次输入密码"/>
      <div class="btn-box">
        <button @click="submit">提交</button>
      </div>

    </div>

  </div>
</template>
<script>
  import $ from 'jquery'
  import {captchaUrl, resetPasswordUrl} from '../api/api'
  import areaList from '../fn/area'
  import {Toast} from 'vant';

  export default {
    data() {
      return {
        appKey: '',
        formData: {
          mobile: null,
          newPassword: '',
          confirmPassword: '',
          code: '',
        },
        btnTxt: '发送验证码',
        time: 60,
        disBtn: true,
      }
    },

    //方法
    methods: {
      submit() {
        if (!this.formData.mobile || this.formData.mobile.length !== 11) {
          return this.$toast("手机号格式错误")
        } else if (!this.formData.code) {
          return this.$toast("请输入验证码")
        } else if (!this.formData.newPassword) {
          return this.$toast("请输入新密码")
        } else if (!this.formData.confirmPassword) {
          return this.$toast("请再次输入密码不能为空")
        } else if (this.formData.confirmPassword !== this.formData.newPassword) {
          return this.$toast("两次密码输入的不一致，请重新输入")
        } else {
          console.log(this.formData)
          this.$ajax({
            method: 'post',
            url: resetPasswordUrl,
            data: {
              username: this.formData.mobile,
              code: this.formData.code,
              password: this.formData.newPassword,
              appKey: this.appKey
            }
          }).then(res => {
            console.log(res)
            Toast.success(res.data.message);
            setTimeout(() => {
              this.$router.push('/login?appKey=' + this.appKey)
            }, 1200)
          }).catch(error => {
            console.log(error.response)
            Toast.fail(error.response.data.message);
          });
        }
      },
      //1.获取验证码
      sendSMS() {
        this.disBtn = false;
        if (!this.formData.mobile || this.formData.mobile.length !== 11) {
          return this.$toast("手机号码格式错误")
        }
        this.$ajax({
          method: 'post',
          url: captchaUrl,
          data: {
            'mobile': this.formData.mobile,
            appKey: this.appKey
          },
        }).then((res) => {
          console.log(res)
          this.$toast("获取成功");
          this.disBtn = false;
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
    },
    mounted() {
//      this.getOpenId();
    },
    created() {
      this.appKey = localStorage.getItem("appKey");
    },
    //计算属性
    computed: {},
    watch: {}
  }
</script>
<style scoped lang="stylus">
  .page-title {
    font-size: 18px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    margin-bottom: 8px;
    background: #fff !important;
  }

  .input {
    padding 15px 10px;
  }
</style>
