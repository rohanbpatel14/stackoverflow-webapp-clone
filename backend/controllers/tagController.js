 
import { sendRequest } from "../kafka/kafka";
import express from "express";
const router = express.Router();

router.get('/', async (req, res) => {
  sendRequest('tags', { action: 'GET_TAGS' }, (err, data) => {
    if (err) {
      res.status(400).json(err);
    }
    res.status(200).json(data);
  });

});

router.post('/', async (req, res) => {
  const { tagname, description } = req.body;
  sendRequest('tags', { tagname, description, action: 'ADD_TAG' }, (err, data) => {
    if (err) {
      res.status(400).json(err);
    }
    res.status(200).json(data);
  });
});

export default router;