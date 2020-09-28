<template>
  <div class="body">
    <div class="page-cell">
      <div class="page-title">个人资料</div>
      <van-cell-group>
        <van-cell title="头像" is-link @click.stop="uploadHeadImg">
          <template slot="default">
            <div class="xinxi">
              <van-uploader :after-read="onRead"
                            ref="upload"
                            @click.native="getTokenAandKey"
                            accept="['jpg','jpeg','png']"
                            action="https://upload.qiniup.com/"
                            :data="{key:qnKey,token:qnToken}">
                <img :src="fileHead" alt="">
              </van-uploader>
            </div>
          </template>
        </van-cell>
        <van-cell title="昵称" is-link @click="isEditNameShow =true" :value="user.name"></van-cell>
        <van-cell title="手机号" v-model="personal.username"></van-cell>
        <van-cell title="修改密码" is-link @click="passwordModification()"></van-cell>
      </van-cell-group>
      <van-popup v-model="isEditNameShow" position="bottom">
        <van-nav-bar
          title="编辑昵称"
          left-text="取消"
          right-text="确定"
          @click-left="isEditNameShow=false"
          @click-right="onUpdateName"
        />
        <div>
          <!-- field组件有一个value事件，该事件接收一个参数：输入框的值
               在模板中$event表示事件参数，Vue本身提供的 -->
          <van-field
            :value="user.name"
            @input="inputName = $event"
            rows="2"
            autosize
            type="textarea"
            maxlength="20"
            placeholder="请输入昵称"
            show-word-limit
          />
        </div>
      </van-popup>
      <div class="btn">
        <van-button @click="signOut">退出登录</van-button>
      </div>
    </div>
  </div>
</template>
<script>
  import {getAccount, updateAccount} from '../../api/account'
  import {getQiniuKey, getQiniuToken} from '../../api/qiniu'

  import {Toast} from 'vant';

  export default {
    name: 'App',
    data() {
      return {
        userInfo: {
          avatar: ""
        },
        user: {
          name: ""
        },
        isEditNameShow: false,
        inputName: '',
        token: '',
        personal: '',
        fileHead: '',
        qnToken: '',
        qnKey: '',
      };
    },
    methods: {
      //修改昵称
      nameModification() {
        // this.$router.push('/modifyNickname')
      },
      onUpdateName() {
        // 1.请求提交表单
        // 2.根据结构执行
        this.user.name = this.inputName
        this.isEditNameShow = false
      },
      getTokenAandKey() {
        this.getQiniuToken();
        this.getQiniuKey();
      },
      getQiniuToken() {
        getQiniuToken().then(res => {
          this.qnToken = res.data.upToken;
        }).catch(error => {
          console.error(error.response)
        });
      },
      getQiniuKey() {
        getQiniuKey().then(res => {
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
      },

      updateAccount() {
        let data = {
          appKey: localStorage.getItem("appKey"),
          photo: this.fileHead
        };
        updateAccount(data).then(res => {
          Toast.success(res.data.message);
        }).catch(error => {
          console.log(error)
        });
      },
      //个人信息
      getPersonalData() {
        getAccount().then(res => {
          this.personal = res.data.content
          this.fileHead = res.data.content.photo
        }).catch(error => {
          console.log(error)
        });
      },
      passwordModification() {
        this.$router.push(`/change-password`)
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
        this.$router.push(`/login?appKey=` + localStorage.getItem("appKey"))
      }
    },
    created() {
      this.token = localStorage.getItem("authenticationToken");
    },
    mounted() {
      this.getPersonalData()
      this.user.name = this.personal.nickname
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
    height: auto;
    background-color: #fff;
    display: flex;
    position: relative;
    top: 0px;
    right: -115px;
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

  .personal_headPortrait {
    float: right;
  }

  .hiddenInput {
    display: none;
  }
</style>
