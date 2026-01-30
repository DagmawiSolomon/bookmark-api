import { Request, Response, NextFunction } from "express"
import { Bookmark } from "../../../models/bookmark.model"
import { bookmarkServices } from "./bookmarks.service"
import { CursorPaginationSchema, listBookmarkSchema } from "./bookmarks.schema"
import { UnauthorizedError } from "../../../errors/http-error";

const getBookmarks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new UnauthorizedError("Unauthenticated");
    }
    const {limit, cursor} = CursorPaginationSchema.parse(req.params)

    const bookmarks = await bookmarkServices.listBookmarks(req.user.id, limit, cursor);
    res.json(bookmarks);
  } catch (err) {
    next(err);
  }
};



const getBookmarksById = () => {

}

const createBookmark = () => {

}

const updateBookmark = () => {

}

const deleteBookmark = () => {

}

export const bookmarksControllers = {getBookmarks, getBookmarksById, createBookmark, updateBookmark, deleteBookmark}