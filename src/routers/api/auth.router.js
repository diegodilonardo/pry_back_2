import { Router } from "express";
import { usuariosManager } from "../../data/managers/mongo/manager.mongo.js";
import { compararHash, crearHash } from "../../helpers/hash.helper.js";
import esUsuario from "../../middlewares/esUsuario.mid.js";

const authRouter = Router();

const registroCB = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    if (!req.body.email || !req.body.password || !req.body.ciudad) {
      const error = new Error("Datos Invalidos");
      error.statusCode = 400;
      throw error;
    }
    const { email } = req.body;
    let user = await usuariosManager.buscarPor({ email });
    if (user) {
      const error = new Error("Datos Incorrectos");
      error.statusCode = 401;
      throw error;
    }
    req.body.password = crearHash(req.body.password);
    user = await usuariosManager.crearRegistro(req.body);
    return res
      .status(201)
      .json({ message: "Usuario Registrado", response: user._id, method, url });
  } catch (error) {
    next(error);
  }
};

const loginCB = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const { email, password } = req.body; // Datos desde el Body
    if (!email || !password) {
      const error = new Error("Datos Invalidos");
      error.statusCode = 400;
      throw error;
    }
    let user = await usuariosManager.buscarPor({ email }); //Datos desde Mongo
    if (!user) {
      const error = new Error("Contraseña Incorrecta");
      error.statusCode = 401;
      throw error;
    }
    const verificarPassword = compararHash(password, user.password);
    if (!verificarPassword) {
      const error = new Error("Contraseña Incorrecta");
      error.statusCode = 401;
      throw error;
    }
    req.session.user_id = user._id;
    req.session.role = user.rol;
    req.session.email = user.email;
    return res
      .status(200)
      .json({ message: "Usuario Logueado", response: user._id, method, url });
  } catch (error) {
    next(error);
  }
};

const signoutCB = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    req.session.destroy();
    return res.status(200).json({
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

authRouter.post("/registro", registroCB);
authRouter.post("/login", loginCB);
authRouter.post("/signout", esUsuario, signoutCB);
authRouter.post("/online", esUsuario, onlineCB);

export default authRouter;
