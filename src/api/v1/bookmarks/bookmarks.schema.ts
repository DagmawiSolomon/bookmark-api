import z from "zod";

export const listBookmarkSchema = z.object({
    userId: z.uuid(),
    limit: z.number().int().min(1).max(50).default(5),
    lastId: z.uuid(),
})

export type ListBookmarksInput = z.infer<typeof listBookmarkSchema>;
