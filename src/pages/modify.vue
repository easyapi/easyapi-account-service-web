<template>
  <div class="body">
    <div class="page-cell">
      <div class="page-title">个人资料</div>
      <ul class="ul">
        <li class="xinxi">
          <span>头像</span>
          <van-uploader :after-read="onRead"
                        ref="upload"
                        @click.native="getTokenAandKey"
                        accept="['jpg','jpeg','png']"
                        action="https://upload.qiniup.com/"
                        :data="{key:qnKey,token:qnToken}">
            <img :src="fileHead" alt="">
            <van-icon name="arrow" style="font-size: 18px;margin-top:17px"/>
          </van-uploader>

          <!--<span style="display: flex">-->
          <!--<img :src="personal.photo" alt="">-->
          <!--<span>-->
          <!---->
          <!--</span>-->
          <!--</span>-->
        </li>
        <li class="xinxi">
          <span>昵称</span>
          <span style="display: flex" @click="nameModification">
              <span>{{personal.nickname}}</span>
             <van-icon name="arrow" style="font-size: 18px;margin-top:17px"/>
          </span>
        </li>
        <li class="xinxi">
          <span>手机号</span>
          <span>{{personal.username}}</span>
        </li>
        <li class="xinxi" @click="passwordModification()">
          <span>修改密码</span>
          <span>   <van-icon name="arrow" style="font-size: 18px;margin-top:17px"/> </span>
        </li>
      </ul>
      <div class="btn">
        <van-button @click="signOut">退出登录</van-button>
      </div>
    </div>
  </div>
</template>
<script>
  import {userInformationUrl, qiniuKeyUrl, qiniuTokenUrl} from '../api/api'
  import {Toast} from 'vant';

  export default {
    name: 'App',
    data() {
      return {
        token: '',
        appKey: '',
        personal: '',
        fileHead: '',
        qnToken: '',
        qnKey: '',
      };
    },
    methods: {
      //修改昵称
      nameModification() {
        this.$router.push('/modifyNickname')
      },
      getTokenAandKey() {
        this.getqiniuToken();
        this.getqiniukey();
      },
      getqiniuToken() {
        this.$ajax.get(qiniuTokenUrl, {}).then(res => {
          this.qnToken = res.data.upToken;
        }).catch(error => {
          console.error(error.response)
        });
      },
      getqiniukey() {
        this.$ajax({
          method: 'get',
          url: qiniuKeyUrl,
        }).then(res => {
          this.qnKey = res.data.key;
        }).catch(error => {
          console.log(error.response)
        });
      },
      onRead(file) {
        this.fileHead = file.content;
        var formData = new FormData();
        formData.append("avatarFile", file.file)
        formData.append("avatarFile", file.file)
        // let img= 'https://qiniu.easyapi.com/' + file.file.lastModified;
        // this.fileHead=img
        //  file.webkitRelativePath = img;
        // this.modifyingHead()
      },

      modifyingHead() {
        this.$ajax({
          method: 'put',
          url: userInformationUrl,
          headers: {
            Authorization: 'Bearer ' + this.token,
            'Content-Type': 'application/json',
          },
          data: {
            appKey: this.appKey,
            photo: this.fileHead
          }
        }).then(res => {
          Toast.success(res.data.message);
        }).catch(error => {
          console.log(error)
        });
      },
      //个人信息
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
          this.personal = res.data.content
          this.fileHead = res.data.content.photo
        }).catch(error => {
          console.log(error)
        });
      },
      passwordModification() {
        this.$router.push(`/changePassword`)
      },
      //退出登录
      signOut() {
        localStorage.removeItem("username");
        localStorage.removeItem("authenticationToken");
        var exdate = new Date();
        exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * (-1));//保存天数
        window.document.cookie = "authenticationToken" + "=" + "" + ";path=/;expires=-1";
        window.document.cookie = "accessToken" + "=" + "" + ";path=/;expires=-1";
        Toast.success('退出成功');
        this.$router.push(`/login?appKey=` + this.appKey)
      }
    },
    created() {
      this.appKey = localStorage.getItem("appKey");
      this.token = localStorage.getItem("authenticationToken");
    },
    mounted() {
      this.getPersonalData()

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

  .ul {
    width: 100%;
    height: auto;
  }

  .xinxi {
    padding: 0px 10px;
    height: 50px;
    line-height: 50px;
    background-color: #fff;
    border-top: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
  }

  .xinxi:last-child {
    border-bottom: 1px solid #ddd;
  }

  .xinxi span:first-child {
    font-size: 14px;
  }

  .xinxi span:nth-child(2) {
    font-size: 14px;
  }

  .xinxi img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    border-radius: 20px;
    margin-top: 5px
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
</style>
