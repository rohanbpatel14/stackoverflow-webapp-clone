import User from '../models/User'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const register = async (payload, cb) => {
  const { firstName, email, password } = payload
  try {
    const user = await User.findOne({ email }).exec()
    if (newUser) {
      return cb("ALready registered", null)
    }
    const salt = await bcrypt.genSalt(10)
    const encrypted = await bcrypt.hash(password, salt)

    const newUser = new User({
      id: uuid(),
      first_name: firstName,
      email: email,
      password: encrypted
    })

    user.save((err, data) => {
      console.log(err)
      if (err) return cb(err, null)
      return cb(null, data)
    })

  } catch (error) {
    console.log(error)
    return cb(error, null)
  }
}

const login = async (payload, cb) => {
  const { email, password } = payload
  try {
    const user = await User.findOne({ email }).exec()
    if (!user) {
      return cb("User Not found", null)
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return cb("Invalid credentials", null)
    }

    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      {
        expiresIn: 3600
      },
      (err, token) => {
        if (err) throw err
        return cb(null, { "token": "Bearer " + token })
      }
    )

  } catch (error) {
    return cb(error, null)
  }
}

export { register, login }