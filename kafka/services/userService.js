import User from '../models/User'

export async function getUserDetails(payload, cb) {
  const { id } = payload;
  try {
    const user = await User.findOne({ where: { id: id } });
    return cb(null, user)
  }
  catch (err) {
    console.log(err)
    return cb(err, null)
  }
}
