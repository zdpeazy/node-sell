import express from 'express';
import db from './mongodb/db.js';
import config from 'config-lite';
import router from './routes/index.js'; //路由
import cookieParser from 'cookie-parser';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import winston from 'winston';
import expressWinston from 'express-winston';
import history from 'connect-history-api-fallback';
import path from 'path';

const app = express();

app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true); //可以带cookies
  res.header("X-Powered-By", '3.2.1')
  if (req.method == 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});

app.use(cookieParser());
const MongoStore = connectMongo(session);

// 设置session 并且存库
app.use(session({
  name: config.session.name,
  secret: config.session.secret,
  resave: true, // 是指每次请求都重新设置session cookie，假设你的cookie是10分钟过期，每次请求都会再设置10分钟
  saveUninitialized: false, // 是指无论有没有session cookie，每次请求都设置个session cookie ，默认给个标示为 connect.sid
  cookie: config.session.cookie,
  store: new MongoStore({ // 存库
    url: config.url 
  })
}));

// 使用winston和express-weinston记录日志

app.use(expressWinston.logger({
    transports: [
        new (winston.transports.Console)({
          json: true,
          colorize: true
        }),
        new winston.transports.File({
          filename: 'logs/success.log'
        })
    ]
}));

app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: 'logs/error.log'
    })
  ]
}));

router(app);
app.use(history());
app.use((err, req, res, next) => {
  res.status(404).send('未找到当前路由');
});

app.listen(config.port);






