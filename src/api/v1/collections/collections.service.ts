import { InternalServerError, NotFoundError } from "../../../errors/http-error";
import { Collection } from "../../../models/collection.model";
import { CollectionInput } from "./collections.schema";

const listCollections = async(userId: string, limit: number, cursor: string | undefined) => {
    try{
        const query = cursor ? {_id: {$gt: cursor}} : {};
        const collections = await Collection.find({user: userId, ...query}).sort({_id: 1}).limit(limit)
        return collections
    }
    catch(err){
        console.log(err)
        throw new InternalServerError("Failed to get collections")
    }
}

const getCollectionById = async (userId: string, collectionId: string) => {
    try{
        const collection = await Collection.findOne({user: userId, _id: collectionId})
        return collection
    }
    catch(err){
        console.log(err)
        throw new InternalServerError("Failed to get collections")
    }
}

const createCollection = async(input: CollectionInput, userId: string) => {
    try{
        const collection = await Collection.create({...input, user: userId})
        return collection
    }
    catch (err) {
        console.log(err)
        throw new InternalServerError("Failed to create bookmark")
    }
}

const updateCollection = async(input: CollectionInput, id: string, userId: string) => {
    try{
        const collection = await Collection.findOneAndUpdate({_id:id, user: userId}, input) 
        return collection
    }
    catch (err) {
        console.log(err)
        throw new InternalServerError("Failed to create bookmark")
    }
}

const deleteCollection = async (id: string, userId: string) => {
    try {
        const collection = await Collection.findOneAndDelete({ _id: id, user: userId })
        return collection
    }
    catch (err) {
        console.log(err)
        throw new InternalServerError("Failed to delete bookmark")
    }
}

export const collectionServices = {listCollections, getCollectionById, createCollection, updateCollection, deleteCollection}