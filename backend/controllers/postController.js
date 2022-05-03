import express from "express";
import { createPost, getAllPosts } from "../services/postService";

const router = express.Router();

router.get('/', async (req, res) => {
  const result = await getAllPosts();
  res.status(200).json(result);
});

router.post('/', async (req, res) => {
  const input = req.body;
  const output = await createPost(input);
  res.status(200).json(output);
});

export default router;