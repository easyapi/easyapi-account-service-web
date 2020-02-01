<template>
  <div class="body">
    <div class="page-cell">
      <div class="page-title">修改密码</div>
      <div class="pass">
        <van-field label="原密码" placeholder="请输入原始密码" type="password" v-model="originalPassword"></van-field>
        <van-field label="新密码" placeholder="请输入新密码" type="password" v-model="newPassword"></van-field>
        <van-field label="确认密码" placeholder="请确认密码" type="password" v-model="confirmPassword"></van-field>
        <van-field style="display:none"></van-field>
      </div>
      <span class="tishi">请输入6~20位，字母或者数字密码</span>
      <div class="btn">
        <van-button @click="PasswordModification">确认</van-button>
      </div>
    </div>
  </div>
</template>
<script>
  import Cookies from 'js-cookie'
  import {changePasswordUrl} from '../api/api'
  import {Toast} from 'vant';

  export default {
    name: 'App',
    data() {
      return {
        appKey: '',
        token: '',
        originalPassword: '',
        newPassword: '',
        confirmPassword: '',
      };
    },
    methods: {
      //修改密码
      PasswordModification() {
        if (!this.originalPassword) {
          return Toast('原始密码不能为空');
        } else if (!this.newPassword) {
          return Toast('新密码不能为空');
        } else if (!this.confirmPassword) {
          return Toast('输入新密码不能为空');
        } else if (this.newPassword !== this.confirmPassword) {
          return Toast('两次密码输入的不一致');
        } else {
          this.$ajax.post(changePasswordUrl, {
            headers: {
              Authorization: 'Bearer ' + this.token,
              'Content-Type': 'application/json'
            },
            data: {
              appKey: this.appKey,
              oldPassword: this.originalPassword,
              password: this.confirmPassword
            }
          }).then(res => {
            Toast.success(res.data.message);
            setTimeout(() => {
              this.$router.push(`/login?jump=index&appKey=` + this.appKey)
            }, 1200)
          }).catch(error => {
            Toast.fail(error.response.data.message);
          });
        }
      },
    },
    created() {
      this.appKey = localStorage.getItem("appKey");
      this.token = Cookies.get('authenticationToken');
    },
    mounted() {

    }
  }
</script>

<style scoped>
  .page-title {
    font-size: 18px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    margin-bottom: 8px;
    background: #fff !important;
  }

  .pass {
    width: 100%;
    height: auto;
  }

  .btn {
    padding-top: 40px;
    width: 100%;
    height: 50px;
    text-align: center;
  }

  .btn button {
    width: 300px;
    color: #fff;
    border: none;
    border-radius: 4px;
    background-color: #52c9f5;
    box-shadow: 0px 3px 15px 0px rgba(12, 143, 192, 0.23);
    font-size: 15px;
  }

  .tishi {
    display: block;
    color: #999999;
    font-size: 12px;
    padding: 10px 20px;
  }
</style>
