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
}

const authController = new AuthController();
export default authController;

const { registroCB, loginCB, signoutCB, onlineCB, badAuth, denegada } = authController;
export { registroCB, loginCB, signoutCB, onlineCB, badAuth, denegada };
