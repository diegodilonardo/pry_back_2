import { Router } from "express";
import session from "express-session";

const sessionsRouter = Router();

const createCb = (req, res, next) => {
  try {
    req.session.role = "ADMIN";
    req.session.mode = "dark";
    const message = "La Sesion Vence en 7 Dias";
    return res.status(201).json({ message });
  } catch (error) {
    next(error);
  }
};

const readCb = (req, res, next) => {
  try {
    const session = req.session;
    return res.status(200).json({ session });
  } catch (error) {
    next(error);
  }
};

const clearCb = (req, res, next) => {
  try {
    req.session.destroy();
    const message = "Sessions eliminada ";
    return res.status(200).json({ message });
  } catch (error) {
    next(error);
  }
};

sessionsRouter.get("/createsessions", createCb);
sessionsRouter.get("/readsessions", readCb);
sessionsRouter.get("/clearsessions", clearCb);

export default sessionsRouter;
