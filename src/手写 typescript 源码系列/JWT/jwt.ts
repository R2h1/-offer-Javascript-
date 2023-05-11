import crypto from 'crypto';

/**
 * 对信息进行签名
 * @param info 信息
 * @param key 密钥
 * @returns
 */
export function sign(info: string, key: string) {
  const hmac = crypto.createHmac('sha256', key);
  hmac.update(info);
  return hmac.digest('hex');
}

/**
 * 生成jwt字符串
 * @param data
 * @param key
 * @returns
 */
export function jwt(data: any, key: string) {
  const header = {
    type: 'JWT',
    alg: 'HS256',
  };
  const headerStr = Buffer.from(JSON.stringify(header)).toString('base64');
  const payloadStr = Buffer.from(JSON.stringify(data)).toString('base64');
  const signStr = sign(headerStr + '.' + payloadStr, key).replace(/=/g, '');
  return headerStr + '.' + payloadStr + '.' + signStr;
}
