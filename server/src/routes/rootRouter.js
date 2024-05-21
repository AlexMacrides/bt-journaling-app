import express from "express";

import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import goalsRouter from "./api/v1/goalsRouter.js";
import entriesRouter from "./api/v1/entriesRouter.js";

const rootRouter = new express.Router();

rootRouter.use("/", clientRouter);
rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/api/v1/goals", goalsRouter)
rootRouter.use("api/v1/entries", entriesRouter)

// place your server-side routes here

export default rootRouter;