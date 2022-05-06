 
import express from "express";
import { createPost, getAllPosts } from "../services/postService";
import { sendRequest } from "../kafka/kafka";

const router = express.Router();

router.get('/', async (req, res) => {
  sendRequest('posts', { action: 'GET_POSTS' }, (err, data) => {
    if (err) {
      res.status(400).json(err);
    }
    res.status(200).json(data);
  });
});

router.post('/', async (req, res) => {
  const input = req.body;
  const output = await createPost(input);
  res.status(200).json(output);
});

export default router;