import { InternalServerError } from "../../../errors/http-error";
import { Tag } from "../../../models/tag.model";
import { TagInput } from "./tags.schema";

const listTags = async (userId: string, limit: number, cursor: string | undefined) => {
    try {
        const query = cursor ? { _id: { $gt: cursor } } : {};
        const tags = await Tag.find({ user: userId, ...query }).sort({ _id: 1 }).limit(limit);
        return tags;
    }
    catch (err) {
        console.log(err);
        throw new InternalServerError("Failed to get tags");
    }
}

const getTagById = async (userId: string, tagId: string) => {
    try {
        const tag = await Tag.findOne({ user: userId, _id: tagId });
        return tag;
    }
    catch (err) {
        console.log(err);
        throw new InternalServerError("Failed to get tag");
    }
}

const createTag = async (input: TagInput, userId: string) => {
    try {
        const tag = await Tag.create({ ...input, user: userId });
        return tag;
    }
    catch (err) {
        console.log(err);
        throw new InternalServerError("Failed to create tag");
    }
}

const updateTag = async (input: TagInput, id: string, userId: string) => {
    try {
        const tag = await Tag.findOneAndUpdate({ _id: id, user: userId }, input, { new: true });
        return tag;
    }
    catch (err) {
        console.log(err);
        throw new InternalServerError("Failed to update tag");
    }
}

const deleteTag = async (id: string, userId: string) => {
    try {
        const tag = await Tag.findOneAndDelete({ _id: id, user: userId });
        return tag;
    }
    catch (err) {
        console.log(err);
        throw new InternalServerError("Failed to delete tag");
    }
}

export const tagServices = { listTags, getTagById, createTag, updateTag, deleteTag };
