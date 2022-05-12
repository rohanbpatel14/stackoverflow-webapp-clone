import User from '../models/User'

export async function getUserDetails(payload, cb) {
  const { userId } = payload
  try {
    const user = User.findOne({ where: { id: userId } })
    return cb(null, user)
  }
  catch (err) {
    console.log(err)
    return cb(err, null)
  }
}

export async function voteQuestion(payload, cb) {
  const { userId, questionId, value } = payload
  console.log("SK user: " + payload);
  try {
    if (value = 1) {
      const data = await User.increment('upvotes', { by: 1, where: { id: userId } });
      const data1 = await User.increment('reputation', { by: 10, where: { id: userId } });
    } else {
      const data = await User.decrement('downvotes', { by: 1, where: { id: userId } });
      const data1 = await User.decrement('reputation', { by: 10, where: { id: userId } });
    }

    if (data) {
      return cb(null, data)
    }
    return cb("Does not exist", null)
  } catch (error) {
    return cb(error, null)
  }
}