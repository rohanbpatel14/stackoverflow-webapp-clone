import sequelize from "../loaders/sql";
import Chat from "../models/chat";

export async function addChat(payload, cb) {
  console.log(payload);

  const { sender_id, reciever_id, message } = payload.data;
  try {
    const newChat = new Chat({
      sender_id: sender_id,
      reciever_id: reciever_id,
      message: message,
    });
    const result = await newChat.save();
    return cb(null, result);
  } catch (error) {
    console.log(error);
    return cb(error, null);
  }
}

export async function getChats(payload, cb) {

  const { id } = payload;
  try {
    const [results, metadata] = await sequelize.query(
      `SELECT U1.full_name as reciever, Users.full_name as sender, chats.* 
      FROM chats JOIN Users U1 ON chats.reciever_id = U1.id  
      JOIN Users on chats.sender_id = Users.id 
      where chats.sender_id = ${id} or chats.reciever_id = ${id}`
    );
    
    // console.log(results);
    return cb(null, results)
  } catch (error) {
    console.log(error);
    return cb(error, null);
  }
}
