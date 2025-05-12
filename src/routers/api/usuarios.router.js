import { Router } from "express";
import passport from "../../middlewares/passport.mid.js";
import { usuariosManager } from "../../data/managers/mongo/manager.mongo.js";

const usuariosRouter = Router();

const actualizarUsuario = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const data = req.body;
    const { _id } = req.user;
    const response = await usuariosManager.actualizarRegistroPorId(_id, data);
    res.status(200).json({ response, method, url });
  } catch (error) {
    next(error);
  }
};

usuariosRouter.put(
  "/",
  passport.authenticate("user", { session: false }),
  actualizarUsuario
);

export default usuariosRouter;
