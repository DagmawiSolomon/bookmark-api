import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
    title: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
},
    { timestamps: true })

tagSchema.index({ title: 1, user: 1 }, { unique: true });

export const Tag = mongoose.model('Tag', tagSchema)