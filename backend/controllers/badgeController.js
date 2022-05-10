 
import { sendRequest } from "../kafka/kafka";
import express from 'express'
const router = express.Router()

router.post('/', async (req, res) => {
    const user = req.body;


});

export default router;