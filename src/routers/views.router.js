import { Router } from "express";
import { productosManager } from "../data/managers/mongo/manager.mongo.js";

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
    res.status(error.statusCode || 500).render("error",({error}))
  }
};

const loginView = async (req, res) => {
  try {
    res.status(200).render("login");
  } catch (error) {
    res.status(error.statusCode || 500).render("error",({error}))
  }
};

viewsRouter.get("/", indexView);
viewsRouter.get("/registro", registroView);
viewsRouter.get("/login", loginView);

export default viewsRouter;
