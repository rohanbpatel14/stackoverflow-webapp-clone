import express from 'express';
import tagController from './tagController';
const router = new express.Router();

router.use('/tags', tagController);

export default router;