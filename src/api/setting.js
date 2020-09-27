import {baseUrl} from "./api";

import axios from 'axios'

/**
 * 获取用户信息
 **
 * @see https://www.easyai.com
 */
export const getLogo = () => axios.get(`${baseUrl}/setting/logo`, {
  params: {
    appKey: localStorage.getItem("appKey")
  }
});
