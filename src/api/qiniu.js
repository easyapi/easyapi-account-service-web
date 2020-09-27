import {accountBaseUrl} from "./api";
import axios from "axios";


/**
 * 获取七牛KEY
 */
export const getQiniuKey = `${accountBaseUrl}/api/qiniu/key`;


/**
 * 获取七牛空间TOKEN
 *
 * @see https://www.easyai.com
 */
export const getQiniuToken = () => axios.get(`${accountBaseUrl}/api/qiniu/upToken`);
