 
import { sendRequest } from "../kafka/kafka";
import express from 'express'
const router = express.Router()

router.post('/', async (req, res) => {
    const { key, tag, user, isAccepted } = req.body;
    sendRequest('posts', { key, tag, user, isAccepted, action: 'SEARCH' }, (err, data) => {
        if (err) {
            res.status(400).json(err);
        }
        else
            res.status(200).json(data);
    });
});

export default router;