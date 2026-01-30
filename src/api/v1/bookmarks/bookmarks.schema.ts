import z from "zod";


export const CursorPaginationSchema = z.object({
    limit: z.number().int().min(1).max(50).default(5),
    cursor: z.uuid().optional()   
})
