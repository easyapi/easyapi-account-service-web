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
        <span slot="button" class="fz-cl-blue" @click="jumpPage('/forgetPassword')">忘记密码?</span>
      </van-field>
      <div class="btn-box">
        <button @click="submit">登录</button>
      </div>
      <div class="other">
        <span @click="jumpPage('/register')">注册新号</span>
        <span @click="jumpPage('/sms-login')">验证码登录</span>
      </div>
    </div>
  </div>
</template>
<script>
  import phoneIcon from '../assets/images/phone_icon.png'
  import pwdIcon from '../assets/images/pwd_icon.png'
  import {passwordLoginUrl, logourl} from '../api/api'

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
//        phoneIcon:require('../assets/images/phone_icon.png')
        phoneIcon: phoneIcon,
        pwdIcon: pwdIcon,
        authenticationToken: '',
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
    //方法
    methods: {
      //     getCookieObj(cookie) {
      //     let v = cookie.split('; ')
      //     console.log(v)
      //     let _obj = {}
      //     for (let i = 0; i < v.length; ++i) {
      //         let k = v[i].split('=')
      //         _obj[k[0]] = k[1]
      //     }
      //     return _obj
      // },
      setCookie(token, exdays) {
        var exp = new Date();
        exp.setTime(exp.getTime() + 24 * 60 * 60 * 1000 * exdays);//保存天数
        window.document.cookie = "authenticationToken" + "=" + token + ";path=/;expires=" + exp.toGMTString();
        localStorage.setItem("authenticationToken", token);
      },
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
      //    getCookie(name){
      //        console.log(name)
      //        console.log(document.cookie)
      //        var arrStr = document.cookie.split("; ");
      //        console.log(arrStr)
      //        for (var i = 0; i < arrStr.length; i++) {
      //            var temp = arrStr[i].split("=");
      //            if (temp[0] == name){
      //                console.log(decodeURI(temp[1]))
      //                this.judgeToken =decodeURI(temp[1])
      //                return decodeURI(temp[1]);
      //            }
      //        }
      // },


      //获取Token
      getToKen() {
        this.$ajax({
          method: 'post',
          url: passwordLoginUrl,
          data: {
            'appKey': this.appKey,
            username: this.formData.mobile,
            password: this.formData.password,
            rememberMe: true
          }
        }).then(res => {
          console.log(res)
          let arr = res.data.id_token.split(" ")
          this.setCookie(arr[1], 30)
          let url = res.data.login_success_url
          localStorage.setItem("LuJin", url);
          localStorage.setItem("logonName", this.formData.mobile);
          window.location.href = 'https://account-service-web.easyapi.com/?appKey=' + this.appKey
        }).catch(error => {
          console.log(error)
          this.$toast("请检查账号，密码");
        });
      },
      //获取logo
      getlogo() {
        this.$ajax({
          method: 'get',
          url: logourl + '?appKey=' + this.appKey,
        }).then(res => {
          console.log(res)
          this.img = res.data.content
          this.showDisabled = false;
          localStorage.setItem("logoImg", res.data.content);
        }).catch(error => {
          console.log(error)
        });
      },
      jumpPage(url) {
        console.log(url)
        this.$router.push({path: url})
      }
    },
    mounted() {
      this.getlogo()
    },
    created() {
      this.formData.mobile = localStorage.getItem("logonName");
      this.LuJin = localStorage.getItem("LuJin");
      console.log(this.token)
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
