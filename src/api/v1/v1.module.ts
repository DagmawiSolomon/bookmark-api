import { authRouter } from "./auth/auth.module";
import { bookmarksRouter } from "./bookmarks/bookmarks.module";
import { collectionRouter } from "./collections/collections.module";
import { tagsRouter } from "./tags/tags.module";

export const v1Routers = [authRouter, bookmarksRouter, collectionRouter, tagsRouter];
