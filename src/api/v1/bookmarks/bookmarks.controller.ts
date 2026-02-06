import { Request, Response, NextFunction } from "express"
import { bookmarkServices } from "./bookmarks.service"
import { BookmarkSchema, CursorPaginationSchema } from "./bookmarks.schema"
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
    const user = req.user as { id: string };
    const { limit, cursor } = CursorPaginationSchema.parse(req.params)

    const bookmarks = await bookmarkServices.listBookmarks(user.id, limit, cursor);
    return res.json(bookmarks).status(200);
  } catch (err) {
    next(err);
  }
};



const getBookmarksById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new UnauthorizedError("Unauthenticated")
    }
    const { id } = req.params
    if (typeof id !== 'string') {
      throw new Error("Invalid ID")
    }
    const user = req.user as { id: string };

    const bookmark = await bookmarkServices.getBookmarkById(user.id, id)
    return res.json(bookmark).status(200);
  }
  catch (err) {
    next(err)
  }
}

const createBookmark = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new UnauthorizedError("Unauthenticated")
    }

    const user = req.user as { id: string };
    const body = BookmarkSchema.parse(req.body)
    const bookmark = await bookmarkServices.createBookmark(body, user.id)
    res.status(201).json(bookmark)

  }
  catch (err) {
    next(err)
  }
}

const updateBookmark = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new UnauthorizedError("Unauthenticated")
    }
    const { id } = req.params
    if (typeof id !== 'string') {
      throw new Error("Invalid ID")
    }
    const user = req.user as { id: string };
    const body = BookmarkSchema.parse(req.body)
    const bookmark = await bookmarkServices.updateBookmark(body, id, user.id)
    res.status(200).json(bookmark)


  }
  catch (err) {
    next(err)
  }
}

const deleteBookmark = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      throw new UnauthorizedError("Unauthenticated")
    }
    const { id } = req.params
    if (typeof id !== 'string') {
      throw new Error("Invalid ID")
    }
    const bookmark = await bookmarkServices.deleteBookmark(id)
    res.status(200).json(bookmark)
  }
  catch (err) {
    next(err)
  }
}


export const bookmarksControllers = { getBookmarks, getBookmarksById, createBookmark, updateBookmark, deleteBookmark }