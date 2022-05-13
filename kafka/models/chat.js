import Sequelize from "sequelize";
import sequelize from "../loaders/sql";

const Chat = sequelize.define(
  "chat",
  {
    message_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    sender_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    reciever_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    message: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    updatedAt: false,
  }
);

export default Chat;
