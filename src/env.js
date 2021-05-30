// 用CORS解决跨域，需要这么配置，同域用代理
let baseUrl;
// console.log(process.env.NODE_ENV)
switch (process.env.NODE_ENV) {
  case 'development':
    baseUrl = 'http://dev-mall-pre.springboot.cn/api';
    break;
  case 'test':
    baseUrl = 'http://test-mall-pre.springboot.cn/api';
    break;
  case 'production':
    baseUrl = 'http://mall-pre.springboot.cn/api';
    break;
  default:
    baseUrl = 'http://mall-pre.springboot.cn/api';
    break;
}

export default {
  baseUrl
}