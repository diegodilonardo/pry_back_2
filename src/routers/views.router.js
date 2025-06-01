import CustomRouter from "../helpers/router.helper.js";
import { productosManager } from "../data/managers/mongo/manager.mongo.js";
import passport from "../middlewares/passport.mid.js";


const indexView = async (req, res) => {
  const productos = await productosManager.buscarRegistros();
  res.status(200).render("index", { productos });
};
const registroView = async (req, res) => {
  res.status(200).render("register");
};
const loginView = async (req, res) => {
  res.status(200).render("login");
};
const detalleProductoView = async (req, res) => {
  const { id } = req.params;
  const producto = await productosManager.buscarRegistroPorId(id);
  res.status(200).render("detalle", { producto });
};
const perfilUsuarioView = async (req, res) => {
  const { user } = req;
  res.status(200).render("perfil", { user });
};
const actualizarPerfilView = async (req, res) => {
  const { user } = req;
  res.status(200).render("actualizarUsuario", { user });
};

class ViewsRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.render("/" , indexView);
    this.render("/registro" , registroView);
    this.render("/login" , loginView);
    this.render("/detalle/:id" , detalleProductoView);
    this.render("/perfil",perfilUsuarioView);
    this.render("/actualizarUsuario", actualizarPerfilView);
  };
}

const viewsRouter = new ViewsRouter().getRouter();

export default viewsRouter;
