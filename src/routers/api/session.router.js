import { Router } from "express";
import {createCb,readCb,clearCb} from "../../controllers/session.controller.js"

const sessionsRouter = Router();

sessionsRouter.get("/createsessions", createCb);
sessionsRouter.get("/readsessions", readCb);
sessionsRouter.get("/clearsessions", clearCb);

export default sessionsRouter;
