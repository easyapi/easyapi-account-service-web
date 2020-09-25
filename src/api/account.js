export const baseURL = 'https://account-service-api.easyapi.com';
import axios from 'axios'

/**
 * 密码登录
 *
 * @see https://www.easyai.com
 */
export const login = (data) => axios.post(`${baseURL}/api/account/pwd-login`, data);


/**
 * 验证码登录
 *
 * @see https://www.easyai.com
 */
export const captchaLogin = (data) => axios.post(`${baseURL}/api/account/captcha-login`, data);
