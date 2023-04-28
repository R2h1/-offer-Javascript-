import axios from 'axios';
/**
 * 1. 对baseUrl进行统一处理
 * 2. 当服务器响应结果中的code不为0时，需要使用alert弹出错误消息
 * 3. 如果服务器响应头中出现Authorization token，需要对把响应头中的token保存到localStorage
 * 4. 请求时，如果发现本地localStorage中包含token，需要将其带入请求头中 Authorization
 */

const instance = axios.create({
  baseURL: 'https://example.com/',
});

instance.interceptors.response.use(
  (resp) => resp.data.data,
  (error) => {
    alert(error.message);
  }
);
/**
 * 登录
 * @param loginId
 * @param loginPwd
 * @returns
 */
async function login(loginId: string, loginPwd: string) {
  return await instance.post('/api/user/login', {
    loginId,
    loginPwd,
  });
}

/**
 * 注册
 * @param loginId
 * @param loginPwd
 * @param nickname
 */
async function reg(loginId: string, loginPwd: string, nickname: string) {}

/**
 * 判定用户是否存在
 * @param loginId
 */
async function exists(loginId: string) {}

/**
 * 恢复登录，获取当前登录的用户信息
 */
async function profile() {}
