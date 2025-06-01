import CustomRouter from "../helpers/router.helper.js";
import productosRouter from "./api/productos.router.js";
import carritosRouter from "./api/carritos.router.js";
import usuariosRouter from "./api/usuarios.router.js";
import cookieRouter from "./api/cookies.router.js";
import sessionRouter from "./api/session.router.js";
import authRouter from "./api/auth.router.js";

class ApiRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.use("/productos", productosRouter);
    this.use("/carritos", carritosRouter);
    this.use("/usuarios", usuariosRouter);
    this.use("/cookies", cookieRouter);
    this.use("/sessions", sessionRouter);
    this.use("/autentificar", authRouter);
  };
}

const apiRouter = new ApiRouter().getRouter();
export default apiRouter;
