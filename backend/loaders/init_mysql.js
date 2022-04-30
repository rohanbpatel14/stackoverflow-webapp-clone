 

import Sequelize from 'sequelize';
import config from '../config/db.sql.json' assert { type: 'json' };;

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

export default sequelize;
