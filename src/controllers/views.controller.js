import {
  buscarRegistrosServices,
  buscarRegistroPorIdServices,
} from "../services/productos.service.js";

const indexView = async (req, res) => {
  const productos = await buscarRegistrosServices();
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
  const producto = await buscarRegistroPorIdServices(id);
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
const verificarUsuarioView = async (req, res) => {
  const { email } = req.params;
  res.status(200).render("verificarUsuario", { email });
};
const resetearPasswordView = async (req, res) => {
  const { email } = req.params;
  res.status(200).render("resetPassword", { email });
};
export {
  indexView,
  registroView,
  loginView,
  perfilUsuarioView,
  detalleProductoView,
  actualizarPerfilView,
  verificarUsuarioView,
  resetearPasswordView,
};