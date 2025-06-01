import CustomRouter from "../../helpers/router.helper.js";
import passportCb from "../../middlewares/passportCb.mid.js";

const registroCB = async (req, res) => {
  const { _id } = req.user;
  res.json201(_id, "Usuario Registrado");
};
const loginCB = async (req, res) => {
  const { _id } = req.user;
  const opts = { maxAge: 7 * 24 * 60 * 60 * 1000 };
  res.cookie("token", req.user.token, opts).json201(_id, "Usuario Logueado");
};
const signoutCB = async (req, res) => {
  res.clearCookie("token").json200(req.user._id, "Usuario Deslogueado");
};
const onlineCB = async (req, res) =>
  res.json200(req.user._id, "Usuario Online");
const badAuth = async (req, res) => res.json401();
const denegada = async (req, res) => res.json403();

class AuthRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.crear("/registro", ["Publico"], passportCb("registro"), registroCB);
    this.crear("/login", ["Publico"],passportCb("login"), loginCB);
    this.crear("/signout", ["Usuario", "Administrador"], signoutCB);
    this.crear("/online", ["Usuario", "Administrador"], onlineCB);
    this.leer(
      "/google",
      ["Publico"],
      passportCb("google", { scope: ["email", "profile"] })
    );
    this.leer("/google/redirect", ["Publico"], passportCb("google"), loginCB);
    this.leer("/autenticacion-incorrecta", ["Publico"], badAuth, onlineCB);
    this.leer("/autenticacion-denegada", ["Publico"], denegada, onlineCB);
  };
}
const authRouter = new AuthRouter().getRouter();
export default authRouter;
