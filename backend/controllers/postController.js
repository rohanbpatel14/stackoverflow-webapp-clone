 
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

router.get('/getInteresting', async (req, res) => {
  sendRequest('posts', { action: 'GET_INTERESTING' }, (err, data) => {
    if (err) {
      res.status(400).json(err);
    }
    else
      res.status(200).json(data);
  });
});

router.get('/getHotPosts', async (req, res) => {
  sendRequest('posts', { action: 'GET_HOT_POSTS' }, (err, data) => {
    if (err) {
      res.status(400).json(err);
    }
    else
      res.status(200).json(data);
  });
});

router.get('/getTopScore', async (req, res) => {
  sendRequest('posts', { action: 'GET_TOP_SCORE' }, (err, data) => {
    if (err) {
      res.status(400).json(err);
    }
    else
      res.status(200).json(data);
  });
});

router.get('/getTopUnanswered', async (req, res) => {
  sendRequest('posts', { action: 'GET_TOP_UNANSWERED' }, (err, data) => {
    if (err) {
      res.status(400).json(err);
    }
    else
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

router.get('/tag/:tagname', async (req, res) => {
  const { tagname } = req.params;
  sendRequest('posts', { tagname, action: 'GET_POSTS_BY_TAG' }, (err, data) => {
    if (err) {
      res.status(400).json(err);
    }
    else
      res.status(200).json(data);
  });
});

router.post('/', async (req, res) => {
  const { title, body, tags, ownerId, approved } = req.body;
  sendRequest('posts', { title, body, tags, ownerId, approved, action: 'ADD_POST' }, (err, data) => {
    if (err) {
      res.status(400).json(err);
    }
    else
      res.status(200).json(data);
  });
});

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
  const { parentId, comment, userId, userName } = req.body;
  sendRequest('posts', { parentId, comment, userId, userName, action: 'ADD_COMMENT' }, (err, data) => {
    if (err) {
      res.status(400).json(err);
    }
    res.status(200).json(data);
  });
});

router.post('/answercomment', async (req, res) => {
  const { questionId, answerId, comment, userId, userName } = req.body;
  sendRequest('posts', { questionId, answerId, comment, userId, userName, action: 'ADD_COMMENT_ANSWER' }, (err, data) => {
    if (err) {
      res.status(400).json(err);
    }
    res.status(200).json(data);
  });
});

router.post('/voteQuestion', async (req, res) => {
  const { userId, questionId, value } = req.body;
  sendRequest('posts', { userId, questionId, value, action: 'VOTE_QUESTION' }, (err, data) => {
    if (err) {
      res.status(400).json(err);
    }
    res.status(200).json(data);
  });
});

router.post('/voteAnswer', async (req, res) => {
  const { userId, questionId, value } = req.body;
  sendRequest('posts', { userId, questionId, value, action: 'VOTE_ANSWER' }, (err, data) => {
    if (err) {
      res.status(400).json(err);
    }
    res.status(200).json(data);
  });
});

router.post('/markAccepted', async (req, res) => {
  const { userId, questionId, answerId } = req.body;
  sendRequest('posts', { userId, questionId, answerId, action: 'MARK_ACCEPTED' }, (err, data) => {
    if (err) {
      res.status(400).json(err);
    }
    res.status(200).json(data);
  });
});

export default router;