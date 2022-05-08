import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    default: [],
  },
  ownerId: {
    type: Number,
    // TODO : remove this once logic for user id implemented
    // required: true,
  },
  answers: {
    type: Array,
    default: [],
  },
  score: {
    type: Number,
    default: 0,
  },
  viewCount: {
    type: Number,
    default: 0,
  },
  approved: {
    type: Boolean
  },
  comment: {
    type: Array,
    default: [],
  },
  activities: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  lastModifiedAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('posts', postSchema);