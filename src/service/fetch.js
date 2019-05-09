import axios from 'axios'
import router from '../router'
import Vant from 'vant';
import {getCookie} from '../fn/_fn.js'

//request header
// axios.defaults.headers.post['encryptDisable'] = true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  console.log(Vant)
  // let token=getCookie('authenticationToken');
  // let token=localStorage.getItem('authenticationToken');
  // if(token===null){
  //   console.log("没有token")
  // }else {
  //   config.headers.Authorization="Bearer "+token;
  // }
  // config.headers.Authorization="Bearer "+token;
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  if (response.data.errorCode === 24 && response.data.errorMsg === "需要登录") {
    Toast("身份过期，请先登录");
    setTimeout(() => {
      router.push('/login')
    }, 1500)

  } else {
    return response;
  }
  // 对响应数据做点什么
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default axios