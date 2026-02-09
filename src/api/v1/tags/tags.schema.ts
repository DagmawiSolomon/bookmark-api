import z from "zod"

export const TagSchema = z.object({
    title: z.string().min(1, "Title is required")
})

export type TagInput = z.infer<typeof TagSchema>
