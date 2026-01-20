import {email, z} from "zod";

export enum AuthRequestType {
  MAGIC_LINK = 'magic_link',
  OAUTH = 'oauth'
}


export const magicLinkSchema = z.object({
    type: z.literal(AuthRequestType.MAGIC_LINK),
    email: z.email()
});

export const oauthSchema = z.object({
    type: z.literal(AuthRequestType.OAUTH),
    provider: z.enum(['google']),
    token: z.string().min(1)
})

export const authRequestSchema = z.discriminatedUnion("type",[
    magicLinkSchema,
    oauthSchema
])

export type AuthRequestInput = z.infer<typeof authRequestSchema>