import CustomRouter from "../../helpers/router.helper.js";
import { usuariosRepository } from "../../repositories/repository.js";

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
  const response = await usuariosRepository.actualizarRegistroPorId(_id, data);
  res.status(200).json({ response, method, url });
};

const usuariosRouter = (new UsuariosRouter()).getRouter();
export default usuariosRouter;
