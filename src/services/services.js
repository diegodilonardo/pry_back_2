import {
  carritosManager,
  productosManager,
  usuariosManager,
} from "../data/managers/mongo/manager.mongo.js";

class Services {
  constructor(manager) {
    this.manager = productosManager;
  }

  buscarRegistros = async (filter) =>
    await this.manager.buscarRegistros(filter);
  buscarRegistroPorId = async (id) =>
    await this.manager.buscarRegistroPorId(id);
  crearRegistro = async (data) => await this.manager.crearRegistro(data);
  actualizarRegistroPorId = async (id, data) =>
    await this.manager.actualizarRegistroPorId(id, data);
  eliminarRegistroPorId = async (id) =>
    await this.manager.eliminarRegistroPorId(id);
}

const productosServices = new Services(productosManager);
const carritosServices = new Services(carritosManager);
const usuariosServices = new Services(usuariosManager);

export { productosServices, carritosServices, usuariosServices };
