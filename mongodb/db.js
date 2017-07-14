// 链接mongodb数据库配置
'use strict';

import mongoose from 'mongoose';
import config from 'config-lite';
mongoose.connect(config.url, {server:{auto_reconnect:true}});
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.once('open', () => {
  console.log('数据库链接成功');
});

db.on('error', function(error) {
  console.log('Error in MongoDb connection: ' + error);
  mongoose.disconnect;
});

db.on('close', function() {
  console.log('数据库断开，重新连接数据库');
  mongoose.connect(config.url, {server:{auto_reconnect:true}});
});

export default db;
