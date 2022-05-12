 
import { sendRequest } from "../kafka/kafka";
import express from 'express'
import { getUserScoreBadges } from "../services/badgeService";
const router = express.Router()

router.post('/', async (req, res) => {
    getUserScoreBadges();
});

export default router;