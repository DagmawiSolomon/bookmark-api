import { authRouter } from "./auth/auth.module";
import { bookmarksRouter } from "./bookmarks/bookmarks.route";
import { collectionRouter } from "./collections/collections.route";
export const v1Routers = [authRouter, bookmarksRouter, collectionRouter];
