import { InternalServerError } from "../../../errors/http-error"
import { Bookmark } from "../../../models/bookmark.model";

const listBookmarks = async (userId: string, limit: number, cursor:string | undefined) => {
    try{
        const query = cursor
  ? { _id: { $gt: cursor } }
  : {};

        const bookmark = await Bookmark.find(query).sort({_id:1}).limit(limit)
        return bookmark
    }
    catch(err){
        console.log(err)
        throw new InternalServerError("Failed to get bookmarks")
    }
}


export const bookmarkServices = {listBookmarks}