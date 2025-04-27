import { Router } from "express";
import { productosManager } from "../data/managers/mongo/manager.mongo.js";

const viewsRouter = Router();

const indexView = async (req, res) => {
  try {
    const productos = await productosManager.buscarProductos();
    res.status(200).render("index", { productos });
  } catch (error) {
    res.status(error.statusCode || 500).render("error", { error });
  }
};

viewsRouter.get("/", indexView);

export default viewsRouter;
