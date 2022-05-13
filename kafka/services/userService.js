import User from '../models/User'
import Bookmark from '../models/Bookmark';
import Posts from '../models/post';

export async function getUserDetails(payload, cb) {
  const { id } = payload;
  try {
    const user = await User.findOne({ where: { id: id } });
    const questions = await Posts.find({ ownerId: id });
    user["questions"] = await questions;
    console.log(user);
    return cb(null, user)
  }
  catch (err) {
    console.log(err)
    return cb(err, null)
  }
}

export async function getUserQuestions(payload, cb) {
  const { id } = payload;
  try {
    const questions = await Posts.find({ ownerId: id });
    return cb(null, questions);
  }
  catch (err) {
    console.log(err)
    return cb(err, null)
  }
}

export async function bookmarkPost(payload, cb) {
  const { userId, postId } = payload

  try {
    const post = await Posts.findOne({ _id: postId })
    const result = await Bookmark.updateOne({ userId: userId }, { $push: { bookmarks: post } }, { upsert: true })
    return cb(null, result)
  }
  catch (err) {
    console.log(err)
    return cb(err, null)
  }
}

export async function getBookmarks(payload, cb) {
  const { id } = payload
  console.log(id)
  try {
    const bookmarks = await Bookmark.findOne({ userId: id })
    console.log(bookmarks)
    return cb(null, bookmarks)
  }
  catch (err) {
    console.log(err)
    return (err, null)
  }
}

export async function getAllusers(payload, cb) {
 
  try {
    const users = await User.findAll();
    return cb(null, users)
  }
  catch (err) {
    console.log(err)
    return (err, null)
  }
}
