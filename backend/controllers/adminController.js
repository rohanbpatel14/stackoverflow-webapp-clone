import express from 'express'
const router = express.Router()
import { sendRequest } from "../kafka/kafka";

import { login } from '../services/authService'


router.post('/login', async (req, res) => {
  const response = await login(req.body)
  console.log(response)
  res.status(response.code).json(response.message)
})

router.get('/getuaqs', async (req, res) => {
  sendRequest('admin', { action: 'GET_UA_POSTS' }, (err, data) => {
    if (err) {
      res.status(400).json(err);
    }
    res.status(200).json(data);
  });
});

router.post('/approveque', async (req, res) => {
  const { id } = req.body;
  console.log(id);
  sendRequest('admin', { id, action: 'APPROVE_QUE' }, (err, data) => {
    if (err) {
      res.status(400).json(err);
    }
    res.status(200).json(data);
  });
});

router.get('/mostviewed', async (req, res) => {
  sendRequest('admin', { action: 'MOST_VIEWED' }, (err, data) => {
    if (err) {
      res.status(400).json(err);
    }
    res.status(200).json(data);
  });
});

router.get('/mostusedtags', async (req, res) => {
  sendRequest('admin', { action: 'GET_MOST_USED_TAGS' }, (err, data) => {
    if (err) {
      res.status(400).json(err);
    }
    res.status(200).json(data);
  });
});

router.get('/highrep', async (req, res) => {
  sendRequest('admin', { action: 'GET_HIGH_REP' }, (err, data) => {
    if (err) {
      res.status(400).json(err);
    }
    res.status(200).json(data);
  });
});

router.get('/lowrep', async (req, res) => {
  sendRequest('admin', { action: 'GET_LOW_REP' }, (err, data) => {
    if (err) {
      res.status(400).json(err);
    }
    res.status(200).json(data);
  });
});

export default router