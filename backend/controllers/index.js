import express from 'express';
import authController from './authController'
import tagController from './tagController';
const router = new express.Router();

router.use('/auth', authController)
router.use('/tags', tagController);

export default router;