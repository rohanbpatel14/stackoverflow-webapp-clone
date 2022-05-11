import redisClient from '../loaders/init-redis';
import Posts from '../models/post';

export async function getuaqs(cb) {
  try {

    const posts = await Posts.find({ approved: false });
    return cb(null, posts);
  } catch (e) {
    console.log(e);
    return cb(e, null)
  }
}