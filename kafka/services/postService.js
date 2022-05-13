import redisClient from "../loaders/init-redis";
import Posts from "../models/post";
import mongoose from "mongoose";
import User from "../models/User";
import TagSequelize from "../models/tag";
import { postABadge } from "./badgeService";

export async function createPost(payload, cb) {
  let { title, body, tags, ownerId, approved } = payload;
  try {
    if (ownerId == null || title == null || body == null) {
      return cb("Missing Required Information", null);
    }

    if (tags.length > 5) {
      return cb("Only 5 tags are allowed", null);
    }
    if (body.includes("img"))
      approved = false;
    for (const i of tags) {
      const tag = await TagSequelize.findOne({
        where: { tagname: i },
      }).catch((e) => {
        console.log(e);
        return cb("Tag not present", null);
      });
      if (tag == null) {
        return cb("Tag not present", null);
      }
      const tagqCount = await TagSequelize.increment("questionCount", {
        by: 1,
        where: { tagname: i },
      });
    }
    const owner = await User.findOne({ where: { id: ownerId } });
    const post = new Posts({
      title,
      body,
      tags,
      ownerId,
      approved,
    });
    post.activities = [
      {
        when: new Date(),
        what: "asked",
        by: owner.full_name,
        comment: "",
      },
    ];
    const result = await post.save();
    // redisClient.del("posts");
    // console.log("New Post added, Redis key removed");
    const qCount = await User.increment("question_count", {
      by: 1,
      where: { id: ownerId },
    });
    console.log(`qCount increamented and now is: ${qCount}`);
    if (qCount !== 0) {
      if (qCount <= 2) {
        const message = postABadge({ badge_name: 'Curious', badge_type: 'bronze', user_id: ownerId })
        console.log(message);
        //badges.push({ badge_name: 'Curious', badge_type: 'bronze' })
      } else if (qCount < 5 && qCount > 2) {
        const message = postABadge({ badge_name: 'Curious', badge_type: 'silver', user_id: ownerId })
        console.log(message);
      } else {
        const message = postABadge({ badge_name: 'Curious', badge_type: 'gold', user_id: ownerId })
        console.log(message);
      }
    }

    return cb(null, result);
  } catch (e) {
    console.log(e);
    return e, null;
  }
}

export async function getInterestingPosts(cb) {
  try {
    let cacheKey = "posts";
    const interestingPosts = [];
    //const redisPosts = await redisClient.get(cacheKey)
    const redisPosts = null;
    if (redisPosts === null) {
      console.log(`Key [${cacheKey}] not in Redis, fetching from Mongo`);
      const posts = await Posts.find({}).sort({ lastModifiedAt: -1 }).limit(20);
      //redisClient.set(cacheKey, JSON.stringify(posts))
      for (let post of posts) {
        if (post["ownerId"] != null || post["ownerId"] != undefined) {
          const owner = await User.findOne({
            where: { id: post["ownerId"] },
            attributes: ["full_name", "reputation", "picture"],
          });
          if (owner != null && post != null) {
            const ownerData = await owner.get();
            const updatedPost = new Object();
            updatedPost.post = post;
            updatedPost.ownerData = ownerData;
            interestingPosts.push(updatedPost)
          }
        }
      }
      return cb(null, interestingPosts);
    } else {
      console.log(`Key [${cacheKey}] found in Redis, returning cached data!`);
      return cb(null, JSON.parse(redisPosts));
    }
  } catch (e) {
    console.log(e);
    return cb(e, null);
  }
}

export async function getHotPosts(cb) {
  try {
    let cacheKey = "posts";
    const hotPosts = [];
    //const redisPosts = await redisClient.get(cacheKey)
    const redisPosts = null;
    if (redisPosts === null) {
      console.log(`Key [${cacheKey}] not in Redis, fetching from Mongo`);
      const posts = await Posts.find({}).sort({ viewCount: -1 }).limit(20);
      //redisClient.set(cacheKey, JSON.stringify(posts))
      for (let post of posts) {
        console.log(post)
        if (post["ownerId"] != null || post["ownerId"] != undefined) {
          const owner = await User.findOne({
            where: { id: post["ownerId"] },
            attributes: ["full_name", "reputation", "picture"],
          });
          if (owner != null && post != null) {
            const ownerData = await owner.get();
            const updatedPost = new Object();
            updatedPost.post = post;
            updatedPost.ownerData = ownerData;
            hotPosts.push(updatedPost)
          }
        }
      }
      return cb(null, hotPosts);
    } else {
      console.log(`Key [${cacheKey}] found in Redis, returning cached data!`);
      return cb(null, JSON.parse(redisPosts));
    }
  } catch (e) {
    console.log(e);
    return cb(e, null);
  }
}

export async function getTopScorePosts(cb) {
  try {
    let cacheKey = "posts";
    const topScorePosts = [];
    //const redisPosts = await redisClient.get(cacheKey)
    const redisPosts = null;
    if (redisPosts === null) {
      console.log(`Key [${cacheKey}] not in Redis, fetching from Mongo`);
      const posts = await Posts.find({}).sort({ score: -1 }).limit(20);
      //redisClient.set(cacheKey, JSON.stringify(posts))
      for (let post of posts) {
        if (post["ownerId"] != null || post["ownerId"] != undefined) {
          const owner = await User.findOne({
            where: { id: post["ownerId"] },
            attributes: ["full_name", "reputation", "picture"],
          });
          if (owner != null && post != null) {
            const ownerData = await owner.get();
            const updatedPost = new Object();
            updatedPost.post = post;
            updatedPost.ownerData = ownerData;
            topScorePosts.push(updatedPost)
          }
        }
      }
      return cb(null, topScorePosts);
    } else {
      console.log(`Key [${cacheKey}] found in Redis, returning cached data!`);
      return cb(null, JSON.parse(redisPosts));
    }
  } catch (e) {
    console.log(e);
    return cb(e, null);
  }
}

export async function getTopUnansweredPosts(cb) {
  try {
    let cacheKey = "posts";
    const topUnansweredPosts = [];
    //const redisPosts = await redisClient.get(cacheKey)
    const redisPosts = null;
    if (redisPosts === null) {
      console.log(`Key [${cacheKey}] not in Redis, fetching from Mongo`);
      const posts = await Posts.find({ "answers.0": { $exists: false } })
        .sort({ score: -1 })
        .limit(20);
      //redisClient.set(cacheKey, JSON.stringify(posts))
      for (let post of posts) {
        if (post["ownerId"] != null || post["ownerId"] != undefined) {
          const owner = await User.findOne({
            where: { id: post["ownerId"] },
            attributes: ["full_name", "reputation", "picture"],
          });
          if (owner != null && post != null) {
            const ownerData = await owner.get();
            const updatedPost = new Object();
            updatedPost.post = post;
            updatedPost.ownerData = ownerData;
            topUnansweredPosts.push(updatedPost)
          }
        }
      }
      return cb(null, topUnansweredPosts);
    } else {
      console.log(`Key [${cacheKey}] found in Redis, returning cached data!`);
      return cb(null, JSON.parse(redisPosts));
    }
  } catch (e) {
    console.log(e);
    return cb(e, null);
  }
}

export async function getPostById(payload, cb) {
  const { id } = payload;
  try {
    let cacheKey = "posts";
    // const redisPosts = await redisClient.get(cacheKey)
    const redisPosts = null;
    if (redisPosts === null) {
      console.log(`Key [${cacheKey}] not in Redis, fetching from Mongo`);
      var post = await Posts.findOneAndUpdate(
        { _id: id },
        { $inc: { viewCount: 1 } }
      )
        .lean()
        .exec();
      const owner = await User.findOne({
        where: { id: post["ownerId"] },
        attributes: ["full_name", "reputation", "picture"],
      });
      const reach = await User.increment("reach", {
        by: 1,
        where: { id: post["ownerId"] },
      });
      post["ownerData"] = await owner.get();
      redisClient.set(cacheKey, JSON.stringify(post));
      return cb(null, post);
    } else {
      console.log(`Key [${cacheKey}] found in Redis, returning cached data!`);
      return cb(null, JSON.parse(redisPosts));
    }
  } catch (e) {
    console.log(e);
    return cb(e, null);
  }
}

export async function getPostByTag(payload, cb) {
  const { tagname } = payload;
  try {
    let cacheKey = "posts";
    // const redisPosts = await redisClient.get(cacheKey)
    const redisPosts = null;
    if (redisPosts === null) {
      console.log(`Key [${cacheKey}] not in Redis, fetching from Mongo`);
      var post = await Posts.find({ tags: tagname }).lean().exec();
      // const owner = await User.findOne({ where: { id: post['ownerId'] } })
      // post['ownerData'] = await owner.get()
      console.log(post.slice(0,20));
      //redisClient.set(cacheKey, JSON.stringify(post))
      return cb(null, post.slice(0,20));
    } else {
      console.log(`Key [${cacheKey}] found in Redis, returning cached data!`);
      return cb(null, JSON.parse(redisPosts));
    }
  } catch (e) {
    console.log(e);
    return cb(e, null);
  }
}

export async function addAnswer(payload, cb) {

  const { questionId, body, ownerId } = payload;
  try {
    if (questionId == null || body == null || ownerId == null) {
      return cb("Missing Required Information", null);
    }
    const date = new Date();
    const answer = {};

    // creating the answer object to be inserted
    answer.id = mongoose.Types.ObjectId();
    answer.body = body;
    answer.isAccepted = false;
    answer.questionId = questionId;
    answer.ownerId = ownerId;
    answer.activity = [
      {
        when: date,
        what: "answered",
        by: ownerId,
        comment: "",
      },
    ];
    answer.score = 0; //default
    answer.createdAt = date;
    answer.updatedAt = date;

    // creating the activity object for question
    const activity = {
      when: date,
      what: "answer",
      by: ownerId,
      comment: "answer added to othe question",
    };
    const result = await Posts.updateOne(
      { _id: questionId },
      {
        $push: {
          answers: answer,
          activities: activity,
        },
      }
    );
    const aCount = await User.increment("answer_count", {
      by: 1,
      where: { id: ownerId },
    });
    return cb(null, result);
  } catch (e) {
    console.log(e);
    return e, null;
  }
}

export async function addComment(payload, cb) {
  const { parentId, comment, userId, userName } = payload;
  try {
    if (parentId == null || comment == null || userId == null) {
      return cb("Missing Required Information", null);
    }
    const comm = {
      id: mongoose.Types.ObjectId(),
      comment: comment,
      userName: userName,
      createdAt: new Date(),
    };

    // creating the activity object for question
    const activity = {
      when: new Date(),
      what: "comment",
      by: userName,
      comment: comment,
    };
    const result = await Posts.updateOne(
      { _id: mongoose.Types.ObjectId(parentId) },
      {
        $push: {
          comment: comm,
          activities: activity,
        },
      }
    );
    const data = await User.increment("comment_count", {
      by: 1,
      where: { id: userId },
    });
    redisClient.del("posts");
    console.log("New Post added, Redis key removed");
    return cb(null, result);
  } catch (e) {
    console.log(e);
    return e, null;
  }
}

export async function addCommentToAnswer(payload, cb) {
  const { questionId, answerId, comment, userId, userName } = payload;
  try {
    if (questionId == null || answerId == null || comment == null || userId == null) {
      return cb("Missing Required Information", null);
    }

    const comm = {
      id: mongoose.Types.ObjectId(),
      comment: comment,
      userName: userName,
      createdAt: new Date(),
    };

    // creating the activity object for question
    const activity = {
      when: new Date(),
      what: "comment",
      by: userName,
      comment: comment,
    };
    var mongoObjectId = mongoose.Types.ObjectId(answerId);
    const result = await Posts.updateOne(
      { _id: questionId, "answers.id": mongoObjectId },
      { $push: { "answers.$.comments": comm, "answers.$.activity": activity } }
    );
    const data = await User.increment("comment_count", {
      by: 1,
      where: { id: userId },
    });
    redisClient.del("posts");
    console.log("New Post added, Redis key removed");
    return cb(null, result);
  } catch (e) {
    console.log(e);
    return e, null;
  }
}

export async function voteQuestion(payload, cb) {
  const { userId, questionId, value } = payload;
  try {
    if (userId == null || questionId == null || value == null) {
      return cb("Missing Required Information", null);
    }
    const result = await Posts.updateOne(
      { _id: questionId },
      {
        $inc: { score: value },
      }
    );
    const postOwner = await Posts.findOne({ _id: questionId }).select(
      "ownerId"
    );
    if (value == 1) {
      const data = await User.increment("upvotes", {
        by: 1,
        where: { id: userId },
      });
      const data1 = await User.increment("reputation", {
        by: 10,
        where: { id: postOwner.ownerId },
      });
    } else {
      const data = await User.decrement("downvotes", {
        by: 1,
        where: { id: userId },
      });
      const data1 = await User.decrement("reputation", {
        by: 10,
        where: { id: postOwner.ownerId },
      });
    }
    return cb(null, result);
  } catch (e) {
    console.log(e);
    return e, null;
  }
}

export async function voteAnswer(payload, cb) {
  const { userId, questionId, answerId, value } = payload;
  try {
    if (userId == null || questionId == null || answerId == null || value == null) {
      return cb("Missing Required Information", null);
    }
    var mongoObjectId = mongoose.Types.ObjectId(answerId);
    const result = await Posts.updateOne(
      { _id: questionId, "answers.id": mongoObjectId },
      {
        $inc: { "answers.$.score": value },
      }
    );
    const postOwner = await Posts.findOne({ _id: questionId, "answers.id": mongoObjectId });
    console.log(postOwner);
    if (value == 1) {
      const data = await User.increment("upvotes", {
        by: 1,
        where: { id: userId },
      });
      const data1 = await User.increment("reputation", {
        by: 5,
        where: { id: postOwner.ownerId },
      });
    } else {
      const data = await User.decrement("downvotes", {
        by: 1,
        where: { id: userId },
      });
      const data1 = await User.decrement("reputation", {
        by: 5,
        where: { id: postOwner.ownerId },
      });
    }
    return cb(null, result);
  } catch (e) {
    console.log(e);
    return e, null;
  }
}

export async function markAccepted(payload, cb) {
  const { userId, questionId, answerId } = payload;
  try {
    if (questionId == null || answerId == null) {
      return cb("Missing Required Information", null);
    }

    // creating the activity object for question
    var mongoObjectId = mongoose.Types.ObjectId(answerId);
    const postAnswers = await Posts.findOne({ _id: questionId, "answers.id": mongoObjectId }).select('answers');

    const ans1 = postAnswers.answers.filter(answer => {
      return answer.id.equals(mongoObjectId);
    })

    const qactivity = {
      when: new Date(),
      what: "answer accepted",
      by: "",
      comment: "marked answer as approved",
    };

    const ansActivity = {
      when: new Date(),
      what: "Approved",
      by: "",
      comment: "marked answer as approved",
    };

    const result = await Posts.updateOne(
      { _id: questionId, "answers.id": mongoObjectId },
      { $set: { "answers.$.isAccepted": true } }
    );

    const res = await Posts.updateOne(
      { _id: questionId },
      { $set: { "answerApproved": true } }
    );

    const data1 = await User.increment("reputation", {
      by: 15,
      where: { id: ans1[0].ownerId },
    });

    const ans = await Posts.updateOne(
      { _id: mongoose.Types.ObjectId(questionId) },
      {
        $push: {
          activities: qactivity,
        },
      }
    );

    const result2 = await Posts.updateOne(
      { _id: questionId, "answers.id": mongoObjectId },
      { $push: { "answers.$.activity": ansActivity } }
    );
    return cb(null, result);
  } catch (e) {
    console.log(e);
    return e, null;
  }
}
