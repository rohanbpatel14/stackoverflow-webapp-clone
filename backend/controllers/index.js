import express from 'express';
import authController from './authController'
import tagController from './tagController';
import postController from './postController';
const router = new express.Router();

router.use('/auth', authController)
router.use('/tags', tagController);
router.use('/posts', postController);

export default router;