import mongoose from 'mongoose';

const bookmarkSchema = new mongoose.Schema({
    userId: {
        type: Number
    },
    bookmarks: {
        type: Array
    }
})

export default mongoose.model('Bookmark', bookmarkSchema);