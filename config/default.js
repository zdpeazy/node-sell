'use strict';

module.exports = {
  port: 8001,
  url: 'mongodb://localhost:27017/sell',
  session: {
    name: 'SID',
    secret: 'SID', // 用来对session id相关的cookie进行签名
    cookie: {
      httpOnly: true,
      secure: false, 
      maxAge: 365 * 24 * 60 * 60 * 1000 // 有效期，单位是毫秒
    }
  }
}