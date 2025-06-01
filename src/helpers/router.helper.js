import { Router } from "express";
import setupRespuestas from "../middlewares/setupResponses.mid.js";
import setupPolicies from "../middlewares/setupPolicies.mid.js";

class CustomRouter {
  constructor() {
    this.router = Router();
    this.use(setupRespuestas);
  }
  getRouter = () => this.router;
  applyMiddlewares = (middlewares) =>
    middlewares.map((mid) => async (req, res, next) => {
      try {
        await mid(req, res, next);
      } catch (error) {
        next(error);
      }
    });

  applyMiddlewaresToRender = (middlewares) =>
    middlewares.map((mid) => async (req, res, next) => {
      try {
        await mid(req, res, next);
      } catch (error) {
        res.status(error.statusCode || 500).render("error", { error });
      }
    });

  crear = (path, politicas, ...middlewares) =>
    this.router.post(
      path,
      setupPolicies(politicas),
      this.applyMiddlewares(middlewares)
    );
  leer = (path, politicas, ...middlewares) =>
    this.router.get(
      path,
      setupPolicies(politicas),
      this.applyMiddlewares(middlewares)
    );
  actualizar = (path, politicas, ...middlewares) =>
    this.router.put(
      path,
      setupPolicies(politicas),
      this.applyMiddlewares(middlewares)
    );
  eliminar = (path, politicas, ...middlewares) =>
    this.router.delete(
      path,
      setupPolicies(politicas),
      this.applyMiddlewares(middlewares)
    );
  use = (path, ...middlewares) =>
    this.router.use(
      path,
      this.applyMiddlewares(middlewares)
    );
  render = (path, politicas, ...middlewares) =>
    this.router.get(
      path,
      setupPolicies(politicas),
      this.applyMiddlewaresToRender(middlewares)
    );
}

export default CustomRouter;
