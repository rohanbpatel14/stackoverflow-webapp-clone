import express from 'express'
const router = express.Router()

import { sendRequest } from "../kafka/kafka";

router.post('/register', (req, res) => {
    console.log('POST /register =>', JSON.stringify(req.body))
    const { full_name, email, password } = req.body
    sendRequest('auth', { full_name, email, password, action: 'REGISTER' }, (err, data) => {
        if (err) {
            res.status(400).json(err)
        }
        res.status(200).json(data)
    })
})

router.post('/login', async (req, res) => {
    console.log('POST /login =>', JSON.stringify(req.body))
    const { email, password } = req.body
    sendRequest('auth', { email, password, action: 'LOGIN' }, (err, data) => {
        if (err) {
            res.status(400).json(err)
        }
        else
            res.status(200).json(data)
    })
})

export default router