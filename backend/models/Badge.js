import sequelize from '../loaders/sql';
import { DataTypes } from "sequelize";

const Badge = sequelize.define('Badge', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  badge_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  badge_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
},
  {
    timestamps: true,
    updatedAt: false
  }
)

export default Badge;