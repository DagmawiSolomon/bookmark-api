import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
    title: {type: String, required: true},
},
{timestamps: true, index:true})

export const Tag = mongoose.model('Tag', tagSchema)