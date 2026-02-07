import mongoose from "mongoose";
import z from "zod";

const ObjectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

export const BookmarkSchema = z.object({
    title: z.string(),
    description: z.string(),
    url: z.string().url(),
    collection: ObjectIdSchema,
    tags: z.array(ObjectIdSchema),
    isFavorite: z.boolean().default(false)
})

export const CursorPaginationSchema = z.object({
    limit: z.coerce.number().int().min(1).max(50).default(5),
    cursor: z.string().optional()
})

export type BookmarkInput = z.infer<typeof BookmarkSchema>
