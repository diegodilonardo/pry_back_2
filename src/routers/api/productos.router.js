import { Router } from "express";
import { productosManager } from "../../data/managers/mongo/manager.mongo.js";

const productosRouter = Router();

const crearProducto = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const data = req.body; 
    const response = await productosManager.crearProducto(data);
    res.status(201).json({ response, method, url });
  } catch (error) {
    next(error);
  }
};
const buscarProductos = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const filter = req.query;
    const response = await productosManager.buscarProductos(filter);
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
const buscarProductoPorId = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const { id } = req.params;
    const response = await productosManager.buscarProductoPorId(id);
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
const actualizarProductoPorId = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const { id } = req.params;
    const data = req.body;
    const response = await productosManager.actualizarProductoPorId(id, data);
    
    res.status(200).json({ response, method, url });
  } catch (error) {
    next(error);
  }
};
const eliminarProductoPorId = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const { id } = req.params;
    const response = await productosManager.eliminarProductoPorId(id);
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

productosRouter.post("/", crearProducto);
productosRouter.get("/", buscarProductos);

productosRouter.get("/:id", buscarProductoPorId);

productosRouter.put("/:id", actualizarProductoPorId);
productosRouter.delete("/:id", eliminarProductoPorId);

export default productosRouter;
