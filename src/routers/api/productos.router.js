import { Router } from "express";
import { productosManager } from "../../data/managers/mongo/manager.mongo.js";

const productosRouter = Router();

const crearRegistro = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const data = req.body; 
    const response = await productosManager.crearRegistro(data);
    res.status(201).json({ response, method, url });
  } catch (error) {
    next(error);
  }
};
const buscarRegistros = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const filter = req.query;
    const response = await productosManager.buscarRegistros(filter);
    if (response.length === 0) {
      const error = new Error("Datos no encontrados");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ response, method, url });
  } catch (error) {
    next(error);
  }
};
const buscarRegistroPorId = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const { id } = req.params;
    const response = await productosManager.buscarRegistroPorId(id);
    if (!response) {
      const error = new Error("Datos no encontrados");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ response, method, url });
  } catch (error) {
    next(error);
  }
};
const actualizarRegsitroPorId = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const { id } = req.params;
    const data = req.body;
    const response = await productosManager.actualizarRegsitroPorId(id, data);
    
    res.status(200).json({ response, method, url });
  } catch (error) {
    next(error);
  }
};
const eliminarRegistroPorId = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const { id } = req.params;
    const response = await productosManager.eliminarRegistroPorId(id);
    if (!response) {
      const error = new Error("Datos no encontrados");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ response, method, url });
  } catch (error) {
    next(error);
  }
};

productosRouter.post("/", crearRegistro);
productosRouter.get("/", buscarRegistros);

productosRouter.get("/:id", buscarRegistroPorId);

productosRouter.put("/:id", actualizarRegsitroPorId);
productosRouter.delete("/:id", eliminarRegistroPorId);

export default productosRouter;
