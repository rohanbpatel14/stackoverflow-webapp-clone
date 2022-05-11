import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

import { sql, mongo } from './loaders/db'

import './consumers/authConsumer'
import './consumers/tagConsumer'
import './consumers/postConsumer'
import './consumers/userConsumer'
import './consumers/adminConsumer'

const app = express();

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Kafka server running on port ${PORT}`);
});