 
import { createTag } from "../services/tagServices";

import express from "express";
const router = express.Router();

router.get('/', async (req, res) => {
  res.json("hello ")
});

router.post('/', async (req, res) => {
  const input = req.body;
  const output = await createTag(input);
  res.status(200).json(output)
});

export default router;