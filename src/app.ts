import express from "express";
import passport from "passport";
import "./config/passport";

import { v1Routers } from "./api/v1/v1.module";
import { errorMiddleware } from "./middlewares/error.middleware";
import { authMiddleware } from "./middlewares/auth.middleware";

const app = express();

app.use(express.json());
app.use(passport.initialize());

v1Routers.forEach(r =>
  app.use(`/api/v1${r.basePath}`, authMiddleware, r.router)
);

app.use(errorMiddleware);

export default app;
