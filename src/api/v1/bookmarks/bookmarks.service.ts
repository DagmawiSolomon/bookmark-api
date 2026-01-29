import { InternalServerError } from "../../../errors/http-error"
import { Bookmark } from "../../../models/bookmark.model";
import { ListBookmarksInput } from "./bookmarks.schema"

const listBookmarks = async (input: ListBookmarksInput) => {
    try{
        const query = input.lastId
  ? { _id: { $gt: input.lastId } }
  : {};

        const bookmark = await Bookmark.find(query).sort({_id:1}).limit(input.limit)
        return bookmark
    }
    catch(err){
        console.log(err)
        throw new InternalServerError("Failed to get bookmarks")
    }
}


export const bookmarkServices = {listBookmarks}