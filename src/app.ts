import express from "express";
import { v1Routers } from "./api/v1/v1.module";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();
app.use(express.json());

v1Routers.forEach(router => app.use("/api/v1", router));

app.use(errorMiddleware)

export default app
