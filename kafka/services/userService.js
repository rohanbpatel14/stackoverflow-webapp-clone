import { v4 as uuid } from 'uuid'
import User from '../models/User'
import FavoritesModel, { findOne as _findOne, deleteOne, find } from './../models/FavoritesModel'
import { findOne as __findOne } from './../models/ProductModel'
import { genSalt, hash } from 'bcrypt'

async function createUser(payload, cb) {
  const { firstName, email, password } = payload
  try {
    const User = await findOne({ email }).exec()
    if (User) {
      return cb("ALready registered", null)
    }
    const salt = await genSalt(10)
    const encrypted = await hash(password, salt)

    const user = new UserModel({
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

export async function updateUser(payload, cb) {
  console.log("------payload-", payload)
  const {
    id,
    firstName,
    lastName,
    email,
    gender,
    dob,
    city,
    address,
    zip_code,
    country,
    about,
    profileImg
  } = payload

  try {
    const user = await findOne({ id }).exec()
    console.log("before updating", user)
    if (user) {
      const id = user._id
      user.update({
        first_name: firstName,
        last_name: lastName,
        email: email,
        gender: gender,
        dob: dob,
        city: city,
        address: address,
        zip_code: zip_code,
        country: country,
        about: about,
        profile_img: profileImg
      }, (err, data) => {
        if (err) return cb(err, null)
        return cb(null, data)
      })
    }
  } catch (error) {
    return cb(error, null)
  }
}

export async function addToFavorites(payload, cb) {
  const { id, productId } = payload
  try {
    const favorite = await _findOne({ id: id, product_id: productId })
    if (favorite == null) {
      const product = await __findOne({ product_id: productId }).exec()
      if (product) {
        const newFavorite = await new FavoritesModel({
          id,
          product_id: productId,
          sellerId: product.seller_id,
          productName: product.product_name,
          category: product.category,
          description: product.description,
          price: product.price,
          quantity: product.quantity,
          img: product.img
        })
        await newFavorite.save((err, data) => {
          console.log("3", err)
          if (err) return cb(err, null)
          return cb(null, data)
        })
      } else {
        return cb("Invalid Product", null)
      }
    } else {
      return cb("Already added to favorites", null)
    }
  } catch (error) {
    return cb(error, null)
  }
}

export async function removeFromFavorites(payload, cb) {
  const { id, productId } = payload

  try {
    const data = await deleteOne({ id: id, product_id: productId }).exec()
    if (data) {
      return cb(null, data)
    }
    return cb("Does not exist", null)
  } catch (error) {
    return cb(error, null)
  }
}

export async function myFavorites(payload, cb) {
  const { id } = payload
  try {
    const favs = await find({ id }).exec()
    if (favs) {
      return cb(null, favs)
    }
    return cb("No Favorites", null)
  } catch (error) {
    return cb(error, null)
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