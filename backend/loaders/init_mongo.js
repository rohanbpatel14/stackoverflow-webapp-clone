 

const mongo = require('mongoose')

const config = require('../config/db.mongo.json')
const env = process.env.ENV || 'dev'
const db = config[env]

mongo.connect(db['uri'], {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Mongo connection ... OK');
}).catch((err) => { console.log(err) })