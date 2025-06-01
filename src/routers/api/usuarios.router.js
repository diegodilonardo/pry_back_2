import CustomRouter from "../../helpers/router.helper.js";
import passport from "../../middlewares/passport.mid.js";
import { usuariosManager } from "../../data/managers/mongo/manager.mongo.js";

class UsuariosRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.actualizar(
      "/",["Usuario", "Administrador"],
      actualizarUsuario
    );
  };
}
const actualizarUsuario = async (req, res) => {
  const { method, originalUrl: url } = req;
  const data = req.body;
  const { _id } = req.user;
  const response = await usuariosManager.actualizarRegistroPorId(_id, data);
  res.status(200).json({ response, method, url });
};

const usuariosRouter = (new UsuariosRouter()).getRouter();
export default usuariosRouter;
