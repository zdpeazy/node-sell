'use strict';

import express from 'express';
import CityHandle from '../controller/v1/cities';

const router = express.Router();

// 获取城市列表 
router.get('/cities', CityHandle.getCity);

export default router;