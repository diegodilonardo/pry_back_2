import { Router } from "express";
import productosRouter from "./api/productos.router.js"
import carritosRouter from "./api/carritos.router.js"
import usuariosRouter from "./api/usuarios.router.js"

const apiRouter = Router();

apiRouter.use("/productos", productosRouter)
apiRouter.use("/carritos", carritosRouter)
apiRouter.use("/usuarios", usuariosRouter)

export default apiRouter;
