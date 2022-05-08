import express from 'express'
const router = express.Router()

router.get('/', async (req, res) => {
    res.status(200).json(result);
});

router.post('/', async (req, res) => {
    const input = req.body;
    const result = await searchQuestions(input);
});