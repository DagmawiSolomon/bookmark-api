import express from "express";
import passport from "passport";
import "./config/passport";

import { v1Routers } from "./api/v1/v1.module";
import { errorMiddleware } from "./middlewares/error.middleware";
import { authMiddleware } from "./middlewares/auth.middleware";

const app = express();

app.use(express.json());
app.use(passport.initialize());

v1Routers.forEach(r => {
  const fullPath = `/api/v1${r.basePath}`;
  if (r.basePath === '/auth') {
    console.log(`[DEBUG] Registering UNPROTECTED route: ${fullPath}`);
    app.use(fullPath, r.router)
  }
  else {
    console.log(`[DEBUG] Registering PROTECTED route: ${fullPath}`);
    app.use(fullPath, authMiddleware, r.router)
  }

});

app.use(errorMiddleware);

export default app;
