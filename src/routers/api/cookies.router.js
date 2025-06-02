import { Router } from "express";
import {
  createCB,
  createSignedCB,
  readCB,
  readSignedCB,
  clearCB,
} from "../../controllers/cookies.controller.js";

const cookieRouter = Router();

cookieRouter.get("/createCookie", createCB);
cookieRouter.get("/createCookie-signed", createSignedCB);
cookieRouter.get("/readCookie", readCB);
cookieRouter.get("/readCookie-signed", readSignedCB);
cookieRouter.get("/clearCookie", clearCB);

export default cookieRouter;
