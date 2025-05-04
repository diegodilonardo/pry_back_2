import { Router } from "express";
import productosRouter from "./api/productos.router.js";
import carritosRouter from "./api/carritos.router.js";
import usuariosRouter from "./api/usuarios.router.js";
import cookieRouter from "./api/cookies.router.js";
import sessionRouter from "./api/session.router.js";
import authRouter from "./api/auth.router.js";

const apiRouter = Router();

apiRouter.use("/productos", productosRouter);
apiRouter.use("/carritos", carritosRouter);
apiRouter.use("/usuarios", usuariosRouter);
apiRouter.use("/cookies", cookieRouter);
apiRouter.use("/sessions", sessionRouter);
apiRouter.use("/autentificar", authRouter);

export default apiRouter;
