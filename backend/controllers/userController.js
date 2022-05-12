 
import { sendRequest } from "../kafka/kafka";
import express from "express";
const router = express.Router();

router.get('/', async (req, res) => {
  const { email } = req.body;
  sendRequest('users', { id, action: 'SEARCH' }, (err, data) => {
    if (err) {
      res.status(400).json(err);
    }
    else
      res.status(200).json(data);
  });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  sendRequest('users', { id, action: 'GET_USER_PROFILE' }, (err, data) => {
    if (err) {
      res.status(400).json(err);
    }
    else
      res.status(200).json(data);
  });
});

export default router;