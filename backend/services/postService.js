import redisClient from '../loaders/init-redis';
import Posts from '../models/post';

export const getAllPosts = async (input) => {

  // Redis cache test
  try {
    redisClient.set('test', 'test-value')
  } catch (error) {
    console.log(error);
  }

  const posts = await Posts.find({}, 'title');
  return posts;
}

export const createPost = async (input) => {
  const { title, body, tags } = input;

  const post = new Posts({
    title,
    body,
    tags,
  });
  const result = await post.save(post);
  return result;
}