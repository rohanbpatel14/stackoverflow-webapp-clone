import redisClient from '../loaders/init-redis';
import Posts from '../models/post';

export async function getAllPosts(cb) {
  try {
    let cacheKey = 'posts'
    const redisPosts = await redisClient.get(cacheKey)
    if (redisPosts === null) {
      console.log(`Key [${cacheKey}] not in Redis, fetching from Mongo`);
      const posts = await Posts.find({}, 'title');
      redisClient.set(cacheKey, JSON.stringify(posts))
      return cb(null, posts);
    } else {
      console.log(`Key [${cacheKey}] found in Redis, returning cached data!`);
      return cb(null, JSON.parse(redisPosts));
    }
  } catch (e) {
    console.log(e);
    return cb(e, null)
  }
}