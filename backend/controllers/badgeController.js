 
import { sendRequest } from "../kafka/kafka";
import express from 'express'
import { getAllBadges, getUserScoreBadges, postABadge } from "../services/badgeService";
import e from "express";
const router = express.Router()

router.post('/', async (req, res) => {
    const badgeResponse = await postABadge(req.body)
    if (badgeResponse === null) {
        res.status(418).send()
    } else {
        res.status(418).send(badgeResponse)
    }
});

router.get('/:id', async (req, res) => {
    const user_id = req.params.id
    console.log(user_id);
    const userBadges = await getAllBadges(user_id);
    if (userBadges === null) {
        const message = {
            'message': 'No badges found for user'
        }
        res.status(404).json(message);
    } else {
        res.status(200).send(userBadges)
    }
});

export default router;