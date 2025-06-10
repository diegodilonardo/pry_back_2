import CustomRouter from "../../helpers/router.helper.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import {registroCB,loginCB,signoutCB,onlineCB,badAuth,denegada,verificarUsuarioCb,resetearPasswordCb,enviarMailVerificarCb,resetearPasswordPublicoCb} from "../../controllers/auth.controller.js"

class AuthRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.crear("/registro", ["Publico"], passportCb("registro"), registroCB);
    this.crear("/login", ["Publico"], passportCb("login"), loginCB);
    this.crear("/signout", ["Usuario", "Administrador"], signoutCB);
    this.crear("/online", ["Usuario", "Administrador"], onlineCB);
    this.leer("/google",["Publico"],passportCb("google", { scope: ["email", "profile"]}));
    this.leer("/google/redirect", ["Publico"], passportCb("google"), loginCB);
    this.leer("/autenticacion-incorrecta", ["Publico"], badAuth);
    this.leer("/autenticacion-denegada", ["Publico"], denegada);
    this.leer("/verificar-email/:email/:codigoverificador",["Publico"],verificarUsuarioCb)
    this.leer("/resetear-password/:email/:newpassword",["Usuario","Administrador"],resetearPasswordCb)
    this.leer("/resetear-password-publico/:email/:newpassword",["Publico"],resetearPasswordPublicoCb)
    this.leer("/olvido-password/:email",["Publico"],enviarMailVerificarCb)
  };
}
const authRouter = new AuthRouter().getRouter();
export default authRouter;
