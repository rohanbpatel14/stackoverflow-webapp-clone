 


// instaed of writing like this: const Sequelize = require('sequelize')
// you write like this:          import Sequelize from 'sequelize';
import config from '../config/db.sql.json';
import { Sequelize } from 'sequelize';

const env = process.env.ENV || 'dev'
const db = config[env]

const sequelize = new Sequelize(db['database'], db['username'], db['password'], {
  dialect: db['dialect'],
  host: db['host']
})

sequelize.authenticate().then(() => {
  console.log('SQL connection ... OK')
  sequelize.sync()
}).catch((err) => {
  console.log(err)
})

export default sequelize
