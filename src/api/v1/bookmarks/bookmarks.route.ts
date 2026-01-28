import { ModuleRouter } from "../../../shared/module-router";
import { bookmarksControllers } from "./bookmarks.controller";

const bookmarksRouter = new ModuleRouter("bookmarks/")

bookmarksRouter.get("/", bookmarksControllers.getBookmarks())
bookmarksRouter.post("/", bookmarksControllers.createBookmark())
bookmarksRouter.get("/:id", bookmarksControllers.getBookmarksById())
bookmarksRouter.put("/:id", bookmarksControllers.updateBookmark())
bookmarksRouter.delete("/:id", bookmarksControllers.deleteBookmark())

