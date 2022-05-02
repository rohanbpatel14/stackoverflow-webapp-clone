 

import mongoose from 'mongoose';
import config from '../config/db.mongo.json';

const env = process.env.ENV || 'dev'
const db = config[env]

const mongo = mongoose.connect(db['uri'], {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Mongo connection ... OK');
}).catch((err) => { console.log(err) })

export default mongo