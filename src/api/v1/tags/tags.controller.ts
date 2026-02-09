import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../../../errors/http-error";
import { CursorPaginationSchema } from "../bookmarks/bookmarks.schema";
import { tagServices } from "./tags.service";
import { TagSchema } from "./tags.schema";

const getTags = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            throw new UnauthorizedError("Unauthenticated");
        }
        const user = req.user as { id: string };
        const { limit, cursor } = CursorPaginationSchema.parse(req.query);
        const tags = await tagServices.listTags(user.id, limit, cursor);
        return res.json(tags).status(200);
    }
    catch (err) {
        next(err);
    }
}

const getTagById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            throw new UnauthorizedError("Unauthenticated");
        }
        const { id } = req.params;
        if (typeof id !== 'string') {
            throw new Error("Invalid ID");
        }
        const user = req.user as { id: string };
        const tag = await tagServices.getTagById(user.id, id);
        return res.json(tag).status(200);
    }
    catch (err) {
        next(err);
    }
}

const createTag = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            throw new UnauthorizedError("Unauthenticated");
        }
        const user = req.user as { id: string };
        const body = TagSchema.parse(req.body);
        const tag = await tagServices.createTag(body, user.id);
        res.status(201).json(tag);
    }
    catch (err) {
        next(err);
    }
}

const updateTag = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            throw new UnauthorizedError("Unauthenticated");
        }
        const { id } = req.params;
        if (typeof id !== 'string') {
            throw new Error("Invalid ID");
        }
        const user = req.user as { id: string };
        const body = TagSchema.parse(req.body);
        const tag = await tagServices.updateTag(body, id, user.id);
        res.status(200).json(tag);
    }
    catch (err) {
        next(err);
    }
}

const deleteTag = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            throw new UnauthorizedError("Unauthenticated");
        }
        const { id } = req.params;
        if (typeof id !== 'string') {
            throw new Error("Invalid ID");
        }
        const user = req.user as { id: string };
        const tag = await tagServices.deleteTag(id, user.id);
        res.status(200).json(tag);
    }
    catch (err) {
        next(err);
    }
}

export const tagControllers = { getTags, getTagById, createTag, updateTag, deleteTag };
