import { Router } from "express";
import passportCb from "../../middlewares/passportCb.mid.js";
import passport from "../../middlewares/passport.mid.js";

const authRouter = Router();

const registroCB = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const { _id } = req.user;
    return res
      .status(201)
      .json({ message: "Usuario Registrado", response: _id, method, url });
  } catch (error) {
    next(error);
  }
};

const loginCB = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const { _id } = req.user;
    return res
      .status(200)
      .cookie("token", req.user.token, { maxAge: 7 * 24 * 60 * 60 * 1000 })
      .json({ message: "Usuario Logueado", response: _id, method, url });
  } catch (error) {
    next(error);
  }
};

const signoutCB = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    return res.status(200).clearCookie("token").json({
      message: "Usuario Deslogueado",
      method,
      url,
    });
  } catch (error) {
    next(error);
  }
};

const onlineCB = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    return res
      .status(200)
      .json({ message: "Usuario Online", response: true, method, url });
  } catch (error) {
    next(error);
  }
};

const badAuth = async (req, res, next) => {
  try {
    const error = new Error("Autorizacion Incorrecta");
    error.statusCode = 401;
    throw error;
  } catch (error) {
    next(error);
  }
};

const denegada = async (req, res, next) => {
  try {
    const error = new Error("Autorizacion Denegada");
    error.statusCode = 403;
    throw error;
  } catch (error) {
    next(error);
  }
};

/*const optsBad = {
  session: false,
  failureRedirect: "/api/autentificar/autenticacion-incorrecta",
};

/*const optsDenegada = {
  session: false,
  failureRedirect: "/api/autentificar/autenticacion-denegada",
};*/

authRouter.post("/registro", passportCb("registro"), registroCB);
authRouter.post("/login", passportCb("login"), loginCB);
authRouter.get(
  "/google",
  passportCb("google", { scope: ["email", "profile"] })
);
authRouter.get("/google/redirect", passportCb("google"), loginCB);
authRouter.post("/signout", passportCb("user"), signoutCB);
authRouter.post("/online", passportCb("user"), onlineCB);
authRouter.get("/autenticacion-incorrecta", badAuth, onlineCB);
authRouter.get("/autenticacion-denegada", denegada, onlineCB);

export default authRouter;
