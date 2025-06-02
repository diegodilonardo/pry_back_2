import CustomRouter from "../helpers/router.helper.js";
import { indexView,registroView,loginView,perfilUsuarioView,detalleProductoView,actualizarPerfilView } from "../controllers/views.controller.js";



class ViewsRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.render("/",["Publico"], indexView);
    this.render("/registro",["Publico"], registroView);
    this.render("/login",["Publico"], loginView);
    this.render("/detalle/:id",["Publico"], detalleProductoView);
    this.render("/perfil",["Usuario","Administrador"],perfilUsuarioView);
    this.render("/actualizarUsuario",["Usuario","Administrador"], actualizarPerfilView);
  };
}

const viewsRouter = new ViewsRouter().getRouter();

export default viewsRouter;
