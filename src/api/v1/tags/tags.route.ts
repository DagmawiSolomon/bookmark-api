import { ModuleRouter } from "../../../shared/module-router";
import { tagControllers } from "./tags.controller";

export const tagsRouter = new ModuleRouter("/tags");

tagsRouter.get("/", tagControllers.getTags);
tagsRouter.post("/", tagControllers.createTag);
tagsRouter.get("/:id", tagControllers.getTagById);
tagsRouter.put("/:id", tagControllers.updateTag);
tagsRouter.delete("/:id", tagControllers.deleteTag);
