import {
  carritosRepository,
  productosRepository,
  usuariosRepository,
} from "../repositories/repository.js";

class Services {
  constructor(repository) {
    this.repository = repository;
  }
  buscarPor = async (filter) => await this.repository.buscarPor(filter);
  buscarRegistros = async (filter) =>
    await this.repository.buscarRegistros(filter);
  buscarRegistroPorId = async (id) =>
    await this.repository.buscarRegistroPorId(id);
  crearRegistro = async (data) => await this.repository.crearRegistro(data);
  actualizarRegistroPorId = async (id, data) =>
    await this.repository.actualizarRegistroPorId(id, data);
  eliminarRegistroPorId = async (id) =>
    await this.repository.eliminarRegistroPorId(id);
}

const productosServices = new Services(productosRepository);
const carritosServices = new Services(carritosRepository);
const usuariosServices = new Services(usuariosRepository);

export { productosServices, carritosServices, usuariosServices };
