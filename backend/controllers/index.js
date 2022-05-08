import express from 'express';
import authController from './authController'
import tagController from './tagController';
import postController from './postController';
import adminController from './adminController';
import searchController from './searchController'
const router = new express.Router();

router.use('/auth', authController)
router.use('/tags', tagController);
router.use('/posts', postController);
router.use('/admin', adminController)
router.use('/search', searchController)

export default router;