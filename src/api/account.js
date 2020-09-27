import {baseUrl} from "./api";

import axios from 'axios'


/**
 * 获取用户信息
 **
 * @see https://www.easyai.com
 */
export const getAccount = () => axios.get(`${baseUrl}/account`, {
  params: {
    appKey: localStorage.getItem("appKey")
  }
});

/**
 * 密码登录
 *
 * @see https://www.easyai.com
 */
export const login = (data) => axios.post(`${baseUrl}/account/login`, data);


/**
 * 验证码登录
 *
 * @see https://www.easyai.com
 */
export const captchaLogin = (data) => axios.post(`${baseUrl}/account/captcha-login`, data);


/**
 * 用户注册
 **
 * @see https://www.easyai.com
 */
export const signup = (data) => axios.post(`${baseUrl}/account/signup`, data);


/**
 * 修改密码
 **
 * @see https://www.easyai.com
 */
export const changePassword = (data) => axios.post(`${baseUrl}/account/change-password`, data);


/**
 * 重置密码
 **
 * @see https://www.easyai.com
 */
export const forgetPassword = (data) => axios.post(`${baseUrl}/account/forget-password/reset`, data);


/**
 * 修改用户资料
 **
 * @see https://www.easyai.com
 */
export const updateAccount = (data) => axios.put(`${baseUrl}/account`, data);
