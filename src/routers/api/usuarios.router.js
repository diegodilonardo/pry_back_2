import CustomRouter from "../../helpers/router.helper.js";
import {
  actualizarUsuario,
  envioMail,
} from "../../controllers/usuarios.controller.js";

class UsuariosRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.actualizar("/", ["Usuario", "Administrador"], actualizarUsuario);
    this.enviar("/:email", ["Publico"], envioMail);
  };
}

const usuariosRouter = new UsuariosRouter().getRouter();
export default usuariosRouter;
