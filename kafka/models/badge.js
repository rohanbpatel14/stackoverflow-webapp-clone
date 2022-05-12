//Author Sakshi

import Sequelize from 'sequelize';

const Badge = sequelize.define('Badge', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  badge_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  badge_type: {
    type: Sequelize.STRING,
    allowNull: false
  },
  user_id: {
    type: Sequelize.STRING,
    allowNull: false
  },
},
  {
    timestamps: true,
    updatedAt: false
  }
)

export default Badge