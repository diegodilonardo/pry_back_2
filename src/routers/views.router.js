import { Router } from "express";
import { productosManager } from "../data/managers/mongo/manager.mongo.js";
import passport from "../middlewares/passport.mid.js";

const viewsRouter = Router();

const indexView = async (req, res) => {
  try {
    const productos = await productosManager.buscarRegistros();
    res.status(200).render("index", { productos });
  } catch (error) {
    res.status(error.statusCode || 500).render("error", { error });
  }
};

const registroView = async (req, res) => {
  try {
    res.status(200).render("register");
  } catch (error) {
    res.status(error.statusCode || 500).render("error", { error });
  }
};

const loginView = async (req, res) => {
  try {
    res.status(200).render("login");
  } catch (error) {
    res.status(error.statusCode || 500).render("error", { error });
  }
};

const detalleProductoView = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await productosManager.buscarRegistroPorId(id);
    res.status(200).render("detalle", { producto });
  } catch (error) {
    res.status(error.statusCode || 500).render("error", { error });
  }
};

const perfilUsuarioView = async (req, res) => {
  try {
    const { user } = req;
    res.status(200).render("perfil", { user });
  } catch (error) {
    res.status(error.statusCode || 500).render("error", { error });
  }
};

const actualizarPerfilView = async (req, res) => {
  try {
    const { user } = req;
    res.status(200).render("actualizarUsuario", { user });
  } catch (error) {
    res.status(error.statusCode || 500).render("error", { error });
  }
};


viewsRouter.get("/", indexView);
viewsRouter.get("/registro", registroView);
viewsRouter.get("/login", loginView);
viewsRouter.get("/detalle/:id", detalleProductoView);
viewsRouter.get("/perfil",passport.authenticate("user", { session: false }),perfilUsuarioView);
viewsRouter.get("/actualizarUsuario", actualizarPerfilView);

export default viewsRouter;
