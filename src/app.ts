import express from "express";
import { v1Routers } from "./api/v1/v1.module";
import { errorMiddleware } from "./middlewares/error.middleware";
import passport from "passport";
import "./config/passport";

const app = express();
app.use(express.json());
app.use(passport.initialize());

v1Routers.forEach(r => app.use(`/api/v1${r.basePath}`, r.router));

app.use(errorMiddleware)

export default app
