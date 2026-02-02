import mongoose from "mongoose";
import z from "zod";

export const BookmarkSchema = z.object({
    user: z.uuid(),
    title: z.string(),
    description: z.string(),
    url: z.url(),
    collection: z.uuid(),
    tags: z.array(z.uuid()),
    isFavourite: z.boolean()
})

export const CursorPaginationSchema = z.object({
    limit: z.number().int().min(1).max(50).default(5),
    cursor: z.uuid().optional()   
})

export type BookmarkInput = z.infer<typeof BookmarkSchema>
