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
    const {limit, cursor} = CursorPaginationSchema.parse(req.params)

    const bookmarks = await bookmarkServices.listBookmarks(req.user.id, limit, cursor);
    return res.json(bookmarks).status(200);
  } catch (err) {
    next(err);
  }
};



const getBookmarksById = async (req: Request, res: Response, next: NextFunction) => {
  try{
    if(!req.user){
      throw new UnauthorizedError("Unauthenticated")
    }
    const {id} = req.params

    const bookmark = await bookmarkServices.getBookmarkById(req.user.id, id[0])
    reuturn res.json(bookmark).status(200);
  }
  catch(err){
    next(err)
  }
}

const createBookmark = async (req: Request, res: Response, next: NextFunction) => {
  try{
    if(!req.user){
       throw new UnauthorizedError("Unauthenticated")
    }

    const body = BookmarkSchema.safeParse(req.body)
    if(body){
    const bookmark = await bookmarkServices.createBookmark(body.data)
    return res.json(bookmark).status(200)
    }
  

  }
  catch(err){
    next(err)
  }
}

const updateBookmark = (req: Request, res: Response, next: NextFunction) => {
try{
    if(!req.user){
       throw new UnauthorizedError("Unauthenticated")
    }
    const {id} = req.params
    const body = BookmarkSchema.safeParse(req.body)
    if(body){
    const bookmark = await bookmarkServices.updateBookmark(body.data, id)
    return res.json(bookmark).status(201)
    }
  

  }
  catch(err){
    next(err)
  }
}

const deleteBookmark = (req: Request, res: Response, next: NextFunction) => {
  try{
    if(!req.user){
       throw new UnauthorizedError("Unauthenticated")
    }
    const {id} = req.params
    const bookmark = await bookmarkServices.deleteBookmark(id)
    return res.json(bookmark).status(200)
  }
  catch(err){
    next(err)
  }
}


export const bookmarksControllers = {getBookmarks, getBookmarksById, createBookmark, updateBookmark, deleteBookmark}