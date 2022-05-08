import express from 'express'
const router = express.Router()

router.get('/', async (req, res) => {
    res.status(200).json(result);
});

router.post('/', async (req, res) => {
    const { key, tag, user, isAccepted } = req.body;
    sendRequest('search', { key, tag, user, isAccepted, action: 'SEARCH' }, (err, data) => {
        if (err) {
            res.status(400).json(err);
        }
        else
            res.status(200).json(data);
    });
});