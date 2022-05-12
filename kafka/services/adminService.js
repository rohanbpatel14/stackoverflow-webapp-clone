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