import redisClient from '../loaders/init-redis';
import Posts from '../models/post';
import mongoose from 'mongoose';

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
    const result = await post.save();
    redisClient.del('posts')
    console.log('New Post added, Redis key removed');
    return cb(null, result);
  } catch (e) {
    console.log(e);
    return (e, null);
  }
}

export async function getInterestingPosts(cb) {
  try {
    let cacheKey = 'posts'
    //const redisPosts = await redisClient.get(cacheKey)
    const redisPosts = null;
    if (redisPosts === null) {
      console.log(`Key [${cacheKey}] not in Redis, fetching from Mongo`);
      const posts = await Posts.find({}).sort({ lastModifiedAt: -1 }).limit(20);
      //redisClient.set(cacheKey, JSON.stringify(posts))
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

export async function getHotPosts(cb) {
  try {
    let cacheKey = 'posts'
    //const redisPosts = await redisClient.get(cacheKey)
    const redisPosts = null;
    if (redisPosts === null) {
      console.log(`Key [${cacheKey}] not in Redis, fetching from Mongo`);
      const posts = await Posts.find({}).sort({ views: -1 }).limit(20);
      //redisClient.set(cacheKey, JSON.stringify(posts))
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

export async function getTopScorePosts(cb) {
  try {
    let cacheKey = 'posts'
    //const redisPosts = await redisClient.get(cacheKey)
    const redisPosts = null;
    if (redisPosts === null) {
      console.log(`Key [${cacheKey}] not in Redis, fetching from Mongo`);
      const posts = await Posts.find({}).sort({ score: -1 }).limit(20);
      //redisClient.set(cacheKey, JSON.stringify(posts))
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

export async function getTopUnansweredPosts(cb) {
  try {
    let cacheKey = 'posts'
    //const redisPosts = await redisClient.get(cacheKey)
    const redisPosts = null;
    if (redisPosts === null) {
      console.log(`Key [${cacheKey}] not in Redis, fetching from Mongo`);
      const posts = await Posts.find({ "answers.0": { "$exists": false } }).sort({ score: -1 }).limit(20);
      //redisClient.set(cacheKey, JSON.stringify(posts))
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
      console.log(`Key [${cacheKey}] not in Redis, fetching from Mongo`);
      const posts = await Posts.find({ _id: id });
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

export async function addAnswer(payload, cb) {
  console.log(payload);
  const { questionId, body, ownerId } = payload;
  try {
    const date = new Date();
    const answer = {};
    //const activity = {};

    // creating the answer object to be inserted
    answer.id = mongoose.Types.ObjectId();
    answer.body = body;
    answer.isAccepted = false;
    answer.questionId = questionId;
    answer.ownerId = ownerId;
    answer.activity = [{
      when: date,
      what: "answered",
      by: ownerId,
      comment: ""
    }]
    answer.score = 0; //default
    answer.createdAt = date;
    answer.updatedAt = date;

    // creating the activity object for question
    const activity = {
      when: date,
      what: "answer",
      by: ownerId,
      comment: "answer added to othe question"
    }
    const result = await Posts.updateOne({ _id: questionId }, {
      $push: {
        answers: answer,
        activities: activity
      }
    });
    return cb(null, result);
  } catch (e) {
    console.log(e);
    return (e, null);
  }
}

export async function addComment(payload, cb) {
  console.log(payload);
  const { parentId, comment, userName } = payload;
  try {
    const comm = {
      id: mongoose.Types.ObjectId(),
      comment: comment,
      userName: userName,
      createdAt: new Date()
    };

    // creating the activity object for question
    const activity = {
      when: new Date(),
      what: "comment",
      by: userName,
      comment: comment
    }
    const result = await Posts.updateOne({ _id: parentId }, {
      $push: {
        comments: comm,
        activities: activity
      }
    });
    redisClient.del('posts')
    console.log('New Post added, Redis key removed');
    return cb(null, result);
  } catch (e) {
    console.log(e);
    return (e, null);
  }
}

export async function addCommentToAnswer(payload, cb) {
  console.log(payload);
  const { questionId, answerId, comment, userName } = payload;
  try {
    const comm = {
      id: mongoose.Types.ObjectId(),
      comment: comment,
      userName: userName,
      createdAt: new Date()
    };

    // creating the activity object for question
    const activity = {
      when: new Date(),
      what: "comment",
      by: userName,
      comment: comment
    }

    const result = await Posts.updateOne({ _id: questionId, $filter: { "answers": { id: answerId } } }, {
      $push: {
        comments: comm,
        activities: activity
      }
    });
    redisClient.del('posts')
    console.log('New Post added, Redis key removed');
    return cb(null, result);
  } catch (e) {
    console.log(e);
    return (e, null);
  }
}