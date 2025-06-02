import CustomRouter from "../../helpers/router.helper.js";
import {
  crearRegistro,
  buscarRegistros,
  buscarRegistroPorId,
  actualizarRegistroPorId,
  eliminarRegistroPorId,
} from "../../controllers/productos.controller.js";

class ProductosRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.crear("/", ["Administrador"], crearRegistro);
    this.leer("/", ["Publico"], buscarRegistros);
    this.leer("/:id", ["Publico"], buscarRegistroPorId);
    this.actualizar("/:id", ["Administrador"], actualizarRegistroPorId);
    this.eliminar("/:id", ["Administrador"], eliminarRegistroPorId);
  };
}
const productosRouter = new ProductosRouter().getRouter();
export default productosRouter;
