export const baseUrl = 'https://account-service-api.easyapi.com';
import axios from 'axios'

/**
 * 发送验证码
 *
 * @see https://www.easyai.com
 */
export const sendCaptcha = (appKey, mobile) => axios.get(`${baseUrl}/captcha/send`, {
  params: {
    appKey: appKey,
    mobile: mobile
  }
});
