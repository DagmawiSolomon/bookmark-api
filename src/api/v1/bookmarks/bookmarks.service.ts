import { InternalServerError } from "../../../errors/http-error"
import { Bookmark } from "../../../models/bookmark.model";
import  { BookmarkInput } from "./bookmarks.schema";

const listBookmarks = async (userId: string, limit: number, cursor:string | undefined) => {
    try{
        const query = cursor
  ? { _id: { $gt: cursor } }
  : {};

        const bookmarks = await Bookmark.find({user:userId, ...query}).sort({_id:1}).limit(limit)
        return bookmarks
    }
    catch(err){
        console.log(err)
        throw new InternalServerError("Failed to get bookmarks")
    }
}

const getBookmarkById = async (userId: string, bookmarkId: string) => {
    try{
        const bookmark = await Bookmark.find({user:userId, id:bookmarkId})
        return bookmark
    }
    catch(err){
        console.log(err)
        throw new InternalServerError("Failed to get bookmark")
    }
}
const createBookmark = async(input:BookmarkInput) => {
    try{
        const bookmark = await Bookmark.create(input)
        return bookmark
    }
    catch(err){
        console.log(err)
        throw new InternalServerError("Failed to create bookmark")
    }   

}


const updateBookmark = async(input:BookmarkInput, id: string) => {
    try{
        const bookmark = await Bookmark.updateOne({id}, input)
        return bookmark
    }
    catch(err){
        console.log(err)
        throw new InternalServerError("Failed to update bookmark")
    }   
}

const deleteBookmark = async(id: string) => {
    try{
        const bookmark = await Bookmark.findOneAndDelete({id})
        return bookmark
    }
    catch(err){
        console.log(err)
        throw new InternalServerError("Failed to delete bookmark")
    }   
}


export const bookmarkServices = {listBookmarks, getBookmarkById, createBookmark, updateBookmark, deleteBookmark}
