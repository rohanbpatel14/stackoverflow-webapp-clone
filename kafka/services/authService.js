import User from '../models/User'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid';

const register = async (payload, cb) => {
  const { full_name, email, password } = payload
  try {
    const user = await User.findOne({ where: { email } })
    if (user) {
      return cb("Already registered", null)
    }
    const salt = await bcrypt.genSalt(10)
    const encrypted = await bcrypt.hash(password, salt)

    const newUser = new User({
      full_name: full_name,
      email: email,
      password: encrypted,
      last_seen: Date.now()
    })
    const result = await newUser.save()
    return cb(null, result)
  } catch (error) {
    console.log(error)
    return cb(error, null)
  }
}

const login = async (payload, cb) => {
  const { email, password } = payload
  try {
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return cb("Email not found", null)
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
        return cb(null, {
          user: {
            id: user.id,
            role: user.user_type
          }, "token": "Bearer " + token
        })
      }
    )

  } catch (error) {
    return cb(error, null)
  }
}

export { register, login }