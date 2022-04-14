'use strict';

import express from 'express';
import controllers from './controllers';

const router = new express.Router();
router.use('/', controllers);

export default router;