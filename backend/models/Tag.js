 
import { DataTypes } from "sequelize";
import sequelize from "../loaders/init_mysql";

const TagSequelize = sequelize.define('tags', {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  tagname: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: 'tagname',
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  questionCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
}, {
  sequelize,
  tableName: 'tags',
  underscored: true,
  timestamps: true,
  indexes: [
    {
      name: 'PRIMARY',
      unique: true,
      using: 'BTREE',
      fields: [
        { name: 'id' },
      ],
    },
    {
      name: 'tagname',
      unique: true,
      using: 'BTREE',
      fields: [
        { name: 'tagname' },
      ],
    },
  ],
});

export default TagSequelize;