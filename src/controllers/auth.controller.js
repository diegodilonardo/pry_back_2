import { usuariosServices } from "../services/services.js";
import { crearHash } from "../helpers/hash.helper.js";

class AuthController {
  registroCB = async (req, res) => {
    const { _id } = req.user;
    res.json201(_id, "Usuario Registrado");
  };
  loginCB = async (req, res) => {
    const { _id } = req.user;
    const opts = { maxAge: 7 * 24 * 60 * 60 * 1000 };
    res.cookie("token", req.user.token, opts).json201(_id, "Usuario Logueado");
  };
  signoutCB = async (req, res) => {
    res.clearCookie("token").json200(req.user._id, "Usuario Deslogueado");
  };
  onlineCB = async (req, res) => res.json200(req.user._id, "Usuario Online");
  badAuth = async (req, res) => res.json401();
  denegada = async (req, res) => res.json403();
  verificarUsuarioCb = async (req, res) => {
    const { email, codigoverificador } = req.params;
    const user = await usuariosServices.buscarPor(
      { email },
      { codigoverificador }
    );
    if (!user) {
      return res.json404();
    }
    await usuariosServices.actualizarRegistroPorId(user._id, {
      verificado: true,
    });
    return res.json200(user, "Usuario Verificado");
  };
  resetearPasswordCb = async (req, res) => {
    const { email } = req.params;
    const { newpassword } = req.params;
    const { _id } = req.user;
    const user = await usuariosServices.buscarPor({ email }, { _id });
    if (!user) {
      return res.json404();
    }
    await usuariosServices.actualizarRegistroPorId(user._id, {
      password: crearHash(newpassword),
    });
    return res.json200(user, "Password Modificado");
  };
}
const authController = new AuthController();
export default authController;
const {
  registroCB,
  loginCB,
  signoutCB,
  onlineCB,
  badAuth,
  denegada,
  verificarUsuarioCb,
  resetearPasswordCb,
} = authController;
export {
  registroCB,
  loginCB,
  signoutCB,
  onlineCB,
  badAuth,
  denegada,
  verificarUsuarioCb,
  resetearPasswordCb,
};
