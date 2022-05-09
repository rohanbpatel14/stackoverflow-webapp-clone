 
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

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  sendRequest('posts', { id, action: 'GET_SINGLE_POST' }, (err, data) => {
    if (err) {
      res.status(400).json(err);
    }
    else
      res.status(200).json(data);
  });
});

router.post('/', async (req, res) => {
  const { title, body, tags, ownerId } = req.body;
  sendRequest('posts', { title, body, tags, ownerId, action: 'ADD_POST' }, (err, data) => {
    if (err) {
      res.status(400).json(err);
    }
    else
      res.status(200).json(data);
  });
});

// router.get('/getQuestionMetaData', async(req,res)=>{

// })
router.post('/answer', async (req, res) => {
  const { questionId, body, ownerId } = req.body;
  sendRequest('posts', { questionId, body, ownerId, action: 'ADD_ANSWER' }, (err, data) => {
    if (err) {
      res.status(400).json(err);
    }
    res.status(200).json(data);
  });
});

router.post('/comment', async (req, res) => {
  const { parentId, comment, userName } = req.body;
  sendRequest('posts', { parentId, comment, userName, action: 'ADD_COMMENT' }, (err, data) => {
    if (err) {
      res.status(400).json(err);
    }
    res.status(200).json(data);
  });
});

router.post('/answercomment', async (req, res) => {
  const { questionId, answerId, comment, userName } = req.body;
  sendRequest('posts', { questionId, answerId, comment, userName, action: 'ADD_COMMENT_ANSWER' }, (err, data) => {
    if (err) {
      res.status(400).json(err);
    }
    res.status(200).json(data);
  });
});

export default router;