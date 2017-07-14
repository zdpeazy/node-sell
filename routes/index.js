'use strict';

//第一个开发城市接口
import v1 from './v1';

export default app => {
  app.use('/v1', v1);
}