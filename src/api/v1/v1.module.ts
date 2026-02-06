import { authRouter } from "./auth/auth.module";
import { bookmarksRouter } from "./bookmarks/bookmarks.route";

export const v1Routers = [authRouter, bookmarksRouter];
