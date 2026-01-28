import { ModuleRouter } from "../../../shared/module-router";

const bookmarksRouter = new ModuleRouter("bookmarks/")

bookmarksRouter.get("/", ()=>{})
bookmarksRouter.post("/", ()=>{})
bookmarksRouter.get("/:id", ()=>{})
bookmarksRouter.put("/:id",()=>{})
bookmarksRouter.delete("/:id", ()=>{})

