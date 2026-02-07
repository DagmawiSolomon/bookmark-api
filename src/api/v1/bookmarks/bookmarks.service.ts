import { InternalServerError } from "../../../errors/http-error"
import { Bookmark } from "../../../models/bookmark.model";
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
        const bookmark = await Bookmark.find({ user: userId, id: bookmarkId })
        return bookmark
    }
    catch (err) {
        console.log(err)
        throw new InternalServerError("Failed to get bookmark")
    }
}
const createBookmark = async (input: BookmarkInput, userId: string) => {
    try {
        const bookmark = await Bookmark.create({ ...input, user: userId })
        return bookmark
    }
    catch (err) {
        console.log(err)
        throw new InternalServerError("Failed to create bookmark")
    }

}


const updateBookmark = async (input: BookmarkInput, id: string, userId: string) => {
    try {
        const bookmark = await Bookmark.updateOne({ _id: id, user: userId }, input)
        return bookmark
    }
    catch (err) {
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
