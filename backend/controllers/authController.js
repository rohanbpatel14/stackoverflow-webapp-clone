import express from 'express'
const router = express.Router()

import { register, login } from '../services/authService'

router.post('/register', (req, res) => {
    const response = register(req.body)
    res.status(response.code).json(response.message)
})

router.post('/login', async (req, res) => {
    const response = await login(req.body)
    console.log(response)
    res.status(response.code).json(response.message)
})

export default router