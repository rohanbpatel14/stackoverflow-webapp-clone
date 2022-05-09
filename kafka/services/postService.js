import redisClient from '../loaders/init-redis';
import Posts from '../models/post';
import User from '../models/User'
import { getUserDetails } from '../services/userService'

export async function createPost(payload, cb) {
  console.log(payload);
  const { title, body, tags, ownerId } = payload;
  try {
    const post = new Posts({
      title,
      body,
      tags,
      ownerId,
    });
    const result = await post.save(post);
    redisClient.del('posts')
    console.log('New Post added, Redis key removed');
    return cb(null, result);
  } catch (e) {
    console.log(e);
    return (e, null);
  }
}

export async function getAllPosts(cb) {
  try {
    let cacheKey = 'posts'
    const redisPosts = await redisClient.get(cacheKey)
    if (redisPosts === null) {
      console.log(`Key [${cacheKey}] not in Redis, fetching from Mongo`);
      const posts = await Posts.find({});
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

export async function getPostById(payload, cb) {
  const { id } = payload;
  try {
    let cacheKey = 'posts'
    // const redisPosts = await redisClient.get(cacheKey)
    const redisPosts = null;
    if (redisPosts === null) {
      console.log(`Key [${cacheKey}] not in Redis, fetching from Mongo`)
      var post = await Posts.findOne({ _id: id }).lean().exec()
      const owner = await User.findOne({ where: { id: post['ownerId'] } })
      post['ownerData'] = await owner.get()
      console.log(post)
      redisClient.set(cacheKey, JSON.stringify(post))
      return cb(null, post)
    } else {
      console.log(`Key [${cacheKey}] found in Redis, returning cached data!`);
      return cb(null, JSON.parse(redisPosts));
    }
  } catch (e) {
    console.log(e);
    return cb(e, null)
  }
}