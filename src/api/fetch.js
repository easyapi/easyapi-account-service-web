import axios from 'axios'
import router from '../router'
import Cookies from "js-cookie";

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  config.headers.Authorization = "Bearer " + Cookies.get("authenticationToken");
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
