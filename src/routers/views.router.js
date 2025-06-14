import CustomRouter from "../helpers/router.helper.js";
import {
  indexView,
  registroView,
  loginView,
  perfilUsuarioView,
  detalleProductoView,
  actualizarPerfilView,
  verificarUsuarioView,
  resetearPasswordView,
  forgetPasswordView,
  resetearPasswordPublicoView
} from "../controllers/views.controller.js";

class ViewsRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.render("/", ["Publico"], indexView);
    this.render("/registro", ["Publico"], registroView);
    this.render("/login", ["Publico"], loginView);
    this.render("/detalle/:id", ["Publico"], detalleProductoView);
    this.render("/perfil", ["Usuario", "Administrador"], perfilUsuarioView);
    this.render(
      "/actualizarUsuario",
      ["Usuario", "Administrador"],
      actualizarPerfilView
    );
    this.render("/verificarUsuario/:email", ["Publico"], verificarUsuarioView);
    this.render("/resetPassword/:email",["Usuario", "Administrador"],
      resetearPasswordView
    );this.render("/forgetPassword", ["Publico"], forgetPasswordView);
    this.render("/resetPasswordPublico/:email/:codigo_verificador",["Publico"],
      resetearPasswordPublicoView
    )
  };
}

const viewsRouter = new ViewsRouter().getRouter();

export default viewsRouter;
