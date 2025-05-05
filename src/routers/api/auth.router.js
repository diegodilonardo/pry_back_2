import { Router } from "express";
import esUsuario from "../../middlewares/esUsuario.mid.js";
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

const optsBad = {
  session: false,
  failureRedirect: "/api/autentificar/autenticacion-incorrecta",
};

const optsDenegada = {
  session: false,
  failureRedirect: "/api/autentificar/autenticacion-denegada",
};

authRouter.post("/registro",passport.authenticate("registro", optsBad),registroCB);

authRouter.post("/login", passport.authenticate("login", optsBad), loginCB);

authRouter.post("/signout",passport.authenticate("user", optsDenegada),signoutCB);



authRouter.post("/online",passport.authenticate("user", optsDenegada),onlineCB);
authRouter.get("/autenticacion-incorrecta", badAuth, onlineCB);
authRouter.get("/autenticacion-denegada", denegada, onlineCB);

export default authRouter;
