<template>
  <div class="modifyNickname">
    <div class="page-title">修改昵称</div>
    <div class="input">
      <van-field class="input-style" v-model="newNickname" placeholder="请输入用户名"/>
      <span class="tishi">请输入新的用户昵称</span>
    </div>
    <div class="btn">
      <van-button @click="modify">确定修改</van-button>
    </div>
  </div>
</template>
<script>
  import {userInformationUrl} from '../api/api'
  import {Field} from 'vant'
  import {Toast} from 'vant';

  export default {
    name: 'App',
    data() {
      return {
        appKey: '',
        token: '',
        newNickname: '',
      };
    },
    methods: {
      //获取用户名昵称
      getPersonalData() {
        this.$ajax({
          method: 'get',
          url: userInformationUrl,
          headers: {
            Authorization: 'Bearer ' + this.token
          },
          params: {
            appKey: this.appKey,
          }
        }).then(res => {
          console.log(res)
          this.newNickname = res.data.content.nickname
        }).catch(error => {
          console.log(error)
        });
      },
      //修改用户昵称
      modify() {
        this.$ajax({
          method: 'put',
          url: userInformationUrl,
          headers: {
            Authorization: 'Bearer ' + this.token,
            'Content-Type': 'application/json',
          },
          data: {
            appKey: this.appKey,
            nickname: this.newNickname
          }
        }).then(res => {
          console.log(res)
          Toast.success(res.data.message);
          this.$router.push('/modify')
        }).catch(error => {
          console.log(error)
        });
      },

    },
    created() {
      this.appKey = localStorage.getItem("appKey");
      console.log(this.appKey)
      this.token = localStorage.getItem("authenticationToken");
      console.log(this.token)
    },
    mounted() {
      this.getPersonalData()
    }
  }
</script>
<style scoped>
  .modifyNickname {
    width: 100%;
    height: auto;
  }

  .page-title {
    font-size: 18px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    margin-bottom: 8px;
    background: #fff !important;
  }

  .input {
    height: 44px;
    margin: 0px 10px;

  }

  .tishi {
    display: block;
    color: #999999;
    font-size: 12px;
    padding: 10px 20px;
  }

  .btn {
    padding-top: 40px;
    width: 100%;
    height: auto;
    text-align: center;
  }

  .btn button {
    width: 300px;
    color: #fff;
    border: none;
    border-radius: 4px;
    margin-bottom: 10px;
    background-color: #52c9f5;
    box-shadow: 0px 3px 15px 0px rgba(12, 143, 192, 0.23);
    font-size: 15px;
  }
</style>
