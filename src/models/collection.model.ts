import mongoose from "mongoose";

const CollectionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    description: { type: String },
    color: { type: String, required: true },
},
    { timestamps: true }
)

export const Collection = mongoose.model('Collection', CollectionSchema)