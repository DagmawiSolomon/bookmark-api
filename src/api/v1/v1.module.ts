import { authRouter } from "./auth/auth.module";
import { bookmarksRouter } from "./bookmarks/bookmarks.route";
import { collectionRouter } from "./collections/collections.route";
import { tagsRouter } from "./tags/tags.route";
export const v1Routers = [authRouter, bookmarksRouter, collectionRouter, tagsRouter];
