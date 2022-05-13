import Sequelize from 'sequelize'
import sequelize from '../loaders/sql'

const User = sequelize.define('User', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  full_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  user_type: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  picture: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  last_seen: {
    type: Sequelize.DATE,
    allowNull: false
  },
  reputation: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  question_count: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  answer_count: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  comment_count: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  upvotes: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  downvotes: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  reach: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  location: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: ""
  },
  about: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: ""
  },
},
  {
    timestamps: true,
    updatedAt: false
  }
)

export default User;