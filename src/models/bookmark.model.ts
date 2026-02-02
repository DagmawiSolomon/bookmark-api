import mongoose from "mongoose";

const BookmarkSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    url: {type: String, required: true},
    collection: {type: mongoose.Schema.Types.ObjectId, ref:"Collection", required: true},
    tags: [
        {type: mongoose.Schema.Types.ObjectId, ref:"Tags"}
    ],
    isFavorite: {type: Boolean, default: false},
},
{timestamps: true}
)

export const Bookmark = mongoose.model('Bookmark', BookmarkSchema)