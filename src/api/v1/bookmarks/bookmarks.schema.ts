import mongoose from "mongoose";
import z from "zod";

export const BookmarkSchema = z.object({
    user: z.string(),
    title: z.string(),
    description: z.string(),
    url: z.string().url(),
    collection: z.string(),
    tags: z.array(z.string()),
    isFavourite: z.boolean()
})

export const CursorPaginationSchema = z.object({
    limit: z.number().int().min(1).max(50).default(5),
    cursor: z.string().optional()
})

export type BookmarkInput = z.infer<typeof BookmarkSchema>
