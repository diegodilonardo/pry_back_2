import { productosRepository } from "../repositories/repository.js";

class ProductosServices {
  constructor() {
    this.manager = productosRepository;
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

const productosServices = new ProductosServices();
export default productosServices;
