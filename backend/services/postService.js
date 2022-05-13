import redisClient from "../loaders/init-redis";
import Posts from "../models/post";

export const getAllPosts = async (input) => {
  let cacheKey = "posts";
  const redisPosts = await redisClient.get(cacheKey);
  if (redisPosts === null) {
    if (owner != null && posts.post != null) {
      console.log(`Key [${cacheKey}] not in Redis, fetching from Mongo`);
      const posts = await Posts.find({});
      redisClient.set(cacheKey, JSON.stringify(posts));
      return posts;
    }
  } else {
    console.log(`Key [${cacheKey}] found in Redis, returning cached data!`);
    return JSON.parse(redisPosts);
  }
};

export const createPost = async (input) => {
  const { title, body, tags } = input;
  const post = new Posts({
    title,
    body,
    tags,
  });
  const result = await post.save(post);
  redisClient.del("posts");
  console.log("New Post added, Redis key removed");
  return result;
};
