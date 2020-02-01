//跟地址
export const baseURL = 'https://account-service-api.easyapi.com';

export const accountBaseUrl = 'https://account.easyapi.com';

//密码登录
export const passwordLoginUrl = `${baseURL}/api/account/pwd-login`;
//验证码登录
export const authenticationCodeLogonUrl = `${baseURL}/api/account/captcha-login`;
//新用户注册
export const registerUrl = `${baseURL}/api/account/signup`;
//获取logo
export const logourl = `${baseURL}/api/setting/logo`;

//获取用户信息


//获取code值
export const codeUrl = `${baseURL}/api/weixinVal/code`;
//获取openid
export const openidUrl = `${baseURL}/api/weixinVal/openId`;
//获取用户信息
export const userInformationUrl = `${baseURL}/api/account`;
//修改密码
export const changePasswordUrl = `${baseURL}/api/account/change-password`;
//重置密码
export const resetPasswordUrl = `${baseURL}/api/account/forget-password/reset`;
//获取logo
export const logoUrl = `${baseURL}/api/setting/logo`;


//发送验证码
export const captchaUrl = `${baseURL}/api/captcha`;


//获取七牛key
export const qiniuKeyUrl = `${accountBaseUrl}/api/qiniu/key`;
//获取七牛token
export const qiniuTokenUrl = `${accountBaseUrl}/api/qiniu/upToken`;
