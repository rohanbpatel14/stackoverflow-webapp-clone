import { sendRequest } from "../kafka/kafka";
import express from "express";
const router = express.Router();

router.post("/send", async (req, res) => {
  // console.log(req.body);
  const data = req.body;
  sendRequest("users", { data, action: "SEND_CHAT" }, (err, data) => {
    if (err) {
      res.status(400).json(err);
    } else res.status(200).json(data);
  });
});

router.get("/get/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
    sendRequest('users', { id, action: 'GET_USER_CHATS' }, (err, data) => {
      if (err) {
        res.status(400).json(err);
      }
      else
        res.status(200).json(data);
    });
});

export default router;
