import Posts from '../models/post';
import TagSequelize from "../models/tag";
import User from '../models/User'

export async function getuaqs(cb) {
  try {
    const posts = await Posts.find({ approved: false });
    return cb(null, posts);
  } catch (e) {
    console.log(e);
    return cb(e, null)
  }
}

export async function approve_question(payload, cb) {
  const { id } = payload;
  console.log(id);
  try {
      var post = await Posts.findOne({ _id: id }).exec();
      if (post){
        post.update({
          approved:true
        },(err,data) => {
          if(err) return cb(err,null)
          return cb(null,"Question Approved!!")
        })
      }
  } catch (e) {
    console.log(e);
    return cb(e, null)
  }
}

export async function mostviewed(cb) {
  try {
    const posts = await Posts.find({}).sort({ viewCount: -1 }).limit(10);
    return cb(null, posts);
  } catch (e) {
    console.log(e);
    return cb(e, null)
  }
}

export async function mostusedtags(cb) {
  try {
    const tags = await TagSequelize.findAll({ 
      limit: 10 ,
      order: [['questionCount', 'DESC']],
      distinct: true,
      attributes: [
        'id',
        'tagname',
        'description',
        'questionCount',
      ],
    });
    return cb(null, tags);
  } catch (e) {
    console.log(e);
    return cb(e, null)
  }
}

export async function highrepusers(cb) {
  try {
    const repuser = await User.findAll({ 
      limit: 10 ,
      order: [['reputation', 'DESC']],
      distinct: true,
    });
    return cb(null, repuser);
  } catch (e) {
    console.log(e);
    return cb(e, null)
  }
}

export async function lowrepusers(cb) {
  try {
    const repuser = await User.findAll({ 
      limit: 10 ,
      order: [['reputation', 'ASC']],
      distinct: true,
    });
    return cb(null, repuser);
  } catch (e) {
    console.log(e);
    return cb(e, null)
  }
}