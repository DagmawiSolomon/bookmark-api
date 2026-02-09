import z from "zod"

export const CollectionSchema = z.object({
    name: z.string(),
    description: z.string(),
    color: z.string()
})

export type CollectionInput = z.infer<typeof CollectionSchema>