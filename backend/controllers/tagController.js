 
import { createTag, getAllTags } from "../services/tagServices";

import express from "express";
const router = express.Router();

router.get('/', async (req, res) => {
  const result = await getAllTags();
  res.status(200).json(result);
});

router.post('/', async (req, res) => {
  const input = req.body;
  const output = await createTag(input);
  res.status(200).json(output)
});

export default router;