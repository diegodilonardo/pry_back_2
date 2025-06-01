import CustomRouter from "../../helpers/router.helper.js";
import { productosManager } from "../../data/managers/mongo/manager.mongo.js";
import passport from "passport";

const crearRegistro = async (req, res) => {
  const data = req.body;
  data.owner_id = req.user._id;
  const response = await productosManager.crearRegistro(data);
  res.json201(response);
};
const buscarRegistros = async (req, res) => {
  const filter = req.query;
  const response = await productosManager.buscarRegistros(filter);
  if (response.length === 0) {
    res.json404();
  }
  res.json200(response);
};
const buscarRegistroPorId = async (req, res) => {
  const { id } = req.params;
  const response = await productosManager.buscarRegistroPorId(id);
  if (!response) {
    res.json404();
  }
  res.json200(response);
};
const actualizarRegistroPorId = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const response = await productosManager.actualizarRegistroPorId(id, data);
  if (!response) {
    res.json404();
  }
  res.json200(response);
};
const eliminarRegistroPorId = async (req, res) => {
  const { id } = req.params;
  const response = await productosManager.eliminarRegistroPorId(id);
  if (!response) {
    res.json404();
  }
  res.json200(response);
};
const optsDenegada = {
  session: false,
  failureRedirect: "/api/autentificar/autenticacion-denegada",
};
class ProductosRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.crear("/", ["Administrador"], crearRegistro);
    this.leer("/", ["Publico"], buscarRegistros);
    this.leer("/:id", ["Publico"], buscarRegistroPorId);
    this.actualizar("/:id", ["Administrador"], actualizarRegistroPorId);
    this.eliminar("/:id", ["Administrador"], eliminarRegistroPorId);
  };
}
const productosRouter = new ProductosRouter().getRouter();
export default productosRouter;
