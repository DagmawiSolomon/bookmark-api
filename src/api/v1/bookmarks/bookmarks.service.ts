import { InternalServerError, NotFoundError } from "../../../errors/http-error"
import { Bookmark } from "../../../models/bookmark.model";
import { Collection } from "../../../models/collection.model";
import { Tag } from "../../../models/tag.model";
import { BookmarkInput, BookmarkSchema } from "./bookmarks.schema";

const listBookmarks = async (userId: string, limit: number, cursor: string | undefined) => {
    try {
        const query = cursor
            ? { _id: { $gt: cursor } }
            : {};

        const bookmarks = await Bookmark.find({ user: userId, ...query }).sort({ _id: 1 }).limit(limit)
        return bookmarks
    }
    catch (err) {
        console.log(err)
        throw new InternalServerError("Failed to get bookmarks")
    }
}

const getBookmarkById = async (userId: string, bookmarkId: string) => {
    try {
        const bookmark = await Bookmark.findOne({ user: userId, _id: bookmarkId })
        return bookmark
    }
    catch (err) {
        console.log(err)
        throw new InternalServerError("Failed to get bookmark")
    }
}
const createBookmark = async (input: BookmarkInput, userId: string) => {
    try {

        // Validate collection ownership
        const collection = await Collection.findOne({ _id: input.collection, user: userId });
        if (!collection) {
            throw new NotFoundError("Collection not found or access denied");
        }

        // Validate tags existence and ownership
        if (input.tags && input.tags.length > 0) {
            const validTags = await Tag.find({ _id: { $in: input.tags }, user: userId });
            if (validTags.length !== input.tags.length) {
                throw new NotFoundError("One or more tags not found or access denied");
            }
        }

        const bookmark = await Bookmark.create({ ...input, user: userId })
        return bookmark
    }
    catch (err) {
        if (err instanceof NotFoundError) throw err;
        console.log(err)
        throw new InternalServerError("Failed to create bookmark")
    }

}


const updateBookmark = async (input: BookmarkInput, id: string, userId: string) => {
    try {
        // Validate collection ownership if provided
        if (input.collection) {
            const collection = await Collection.findOne({ _id: input.collection, user: userId });
            if (!collection) {
                throw new NotFoundError("Collection not found or access denied");
            }
        }

        // Validate tags existence and ownership if provided
        if (input.tags && input.tags.length > 0) {
            const validTags = await Tag.find({ _id: { $in: input.tags }, user: userId });
            if (validTags.length !== input.tags.length) {
                throw new NotFoundError("One or more tags not found or access denied");
            }
        }

        const bookmark = await Bookmark.findOneAndUpdate({ _id: id, user: userId }, input, { new: true })
        return bookmark
    }
    catch (err) {
        if (err instanceof NotFoundError) throw err;
        console.log(err)
        throw new InternalServerError("Failed to update bookmark")
    }
}

const deleteBookmark = async (id: string, userId: string) => {
    try {
        const bookmark = await Bookmark.findOneAndDelete({ _id: id, user: userId })
        return bookmark
    }
    catch (err) {
        console.log(err)
        throw new InternalServerError("Failed to delete bookmark")
    }
}


export const bookmarkServices = { listBookmarks, getBookmarkById, createBookmark, updateBookmark, deleteBookmark }
