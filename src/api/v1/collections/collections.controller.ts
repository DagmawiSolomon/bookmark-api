import { NextFunction, Request } from "express";
import { UnauthorizedError } from "../../../errors/http-error";
import { CursorPaginationSchema } from "../bookmarks/bookmarks.schema";
import { collectionServices } from "./collections.service";
import { CollectionSchema } from "./collections.schema";

const getCollections = async(req: Request, res: Response, next: NextFunction) =>{
    try{
        if(!req.user){
            throw new UnauthorizedError("Unauthenticated")
        }
        const user = req.user as {id: string}
        const {limit, cursor} = CursorPaginationSchema.parse(req.query)
        const collections = await collectionServices.listCollections(user.id, limit, cursor)
        return res.json(collections).status(200)
    }
    catch(err){
        next(err)
    }
}

const getCollectionById = async(req: Request, res: Response, next: NextFunction) =>{
    try{
        if (!req.user) {
        throw new UnauthorizedError("Unauthenticated")
        }
        const {id} = req.params
         if (!req.user) {
            throw new UnauthorizedError("Unauthenticated")
        }
        const user = req.user as { id: string };
        const collection = await collectionServices.getCollectionById(user.id, id)
        return res.json(collection).status(200)
    }   
    catch(err){
        next(err)
    }
}

const createCollection = async(req: Request, res: Response, next: NextFunction) =>{
    try{
        if (!req.user) {
            throw new UnauthorizedError("Unauthenticated")
        }
        const user = req.user as {id: string};
        const body = CollectionSchema.parse(req.body)
        const collection = await collectionServices.createCollection(body,user.id)
        res.status(201).json(collection)
    }
    catch(err){
        next(err)
    }
}

const updateCollection = async(req: Request, res: Response, next: NextFunction) =>{
    try{
         if (!req.user) {
            throw new UnauthorizedError("Unauthenticated")
        }
        const {id} = req.params
        if (typeof id !== 'string') {
            throw new Error("Invalid ID")
        }
        const user = req.user as {id: string}
        const body = CollectionSchema.parse(req.body)
        const collection = await collectionServices.updateCollection(body,id, user.id)
        res.status(200).json(collection) 

    }
    catch(err){
        next(err)
    }
}

const deleteCollection = async(req: Request, res: Response, next: NextFunction) =>{
    try{
        if (!req.user) {
            throw new UnauthorizedError("Unauthenticated")
        }
        const { id } = req.params
        if (typeof id !== 'string') {
            throw new Error("Invalid ID")
        }
        const user = req.user as { id: string };
        const colletion = await collectionServices.deleteCollection(id, user.id)
        res.status(200).json(collection)
    }
    catch(err){
        next(err)
    }
}

export const collectionControllers = {getCollections, getCollectionById, createCollection, updateCollection, deleteCollection}