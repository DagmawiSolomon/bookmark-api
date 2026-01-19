import express from "express"
import { v1Routers } from "./api/v1/v1.module"

const app = express()
app.use(express.json())

v1Routers.forEach(router => app.use("/api/v1", router));
