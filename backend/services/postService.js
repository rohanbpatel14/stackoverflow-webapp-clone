import Posts from '../models/post';

export const getAllPosts = async (input) => {
  const posts = await Posts.find();
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