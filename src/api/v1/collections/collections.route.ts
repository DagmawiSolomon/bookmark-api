import { ModuleRouter } from "../../../shared/module-router";
import { collectionControllers } from "./collections.controller";

export const collectionRouter = new ModuleRouter("/collections")

collectionRouter.get("/", collectionControllers.getCollections)
collectionRouter.post("/", collectionControllers.createCollection)
collectionRouter.get("/:id", collectionControllers.getCollectionById)
collectionRouter.put("/:id", collectionControllers.updateCollection)
collectionRouter.delete("/:id", collectionControllers.deleteCollection)