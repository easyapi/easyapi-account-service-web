<template>
  <div class="body">
    <div class="page-cell">
      <div class="page-title">我的</div>
      <div class="personalInformation" @click="pageModification">
        <div class="information">
          <div class="img"><img :src="user.photo" alt=""></div>
          <div class="survey">
            <span style="color: #333;font-size:18px">昵称：{{user.nickname}}</span>
            <span style="color: #999">{{user.username}}</span>
          </div>
          <div class="plo">
            <van-icon name="arrow" style="font-size: 18px; color:#999;"/>
          </div>
        </div>
      </div>
      <div class="btn">
        <van-button @click="drawBill">我要开发票</van-button>
      </div>
    </div>
  </div>
</template>
<script>
  import {getAccount} from '../api/account'

  export default {
    name: 'App',
    data() {
      return {
        token: '',
        user: '',
        username: '',
      };
    },
    methods: {
      getAccount() {
        getAccount().then(res => {
          this.user = res.data.content
        }).catch(error => {
        });
      },
      pageModification() {
        this.$router.push(`/modify`)
      },
      //跳转开发票
      drawBill() {
        window.location.href = localStorage.getItem("invoiceUrl")
      },
    },
    created() {
      if (this.$route.query.appKey) {
        localStorage.setItem("appKey", this.$route.query.appKey);
      }
    },
    mounted() {
      this.getAccount()
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

  .personalInformation {
    width: 100%;
    height: auto;
    border-bottom: 1px solid #f3f4f6;
    border-top: 1px solid #f3f4f6;
  }

  .personalInformation .information {
    padding: 0px 15px;
    display: flex;
  }

  .personalInformation .information .img {
    padding: 15px 0px;
    width: 15%;
  }

  .personalInformation .information .img img {
    width: 40px;
    height: 40px;
    margin-left: 10px;
    border-radius: 20px;
  }

  .personalInformation .information .survey {
    width: 70%;
    padding: 10px 10px;
  }

  .personalInformation .information .survey span {
    display: block;
    font-size: 14px;
    padding-top: 5px;
  }

  .plo {
    width: 15%;
    text-align: center;
    line-height: 70px;
  }

  .btn {
    padding-top: 50px;
    width: 100%;
    height: auto;
    text-align: center;
  }

  .btn button {
    width: 300px;
    color: #fff;
    border: none;
    border-radius: 4px;
    background-color: #52c9f5;
    box-shadow: 0px 3px 15px 0px rgba(12, 143, 192, 0.23);
    font-size: 16px;
  }
</style>
