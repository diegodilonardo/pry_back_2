import {
  carritosManager,
  productosManager,
  usuariosManager,
} from "../dao/factory.js";
import CarritosDTO from "../dto/carritos.dto.js";
import ProductosDTO from "../dto/productos.dto.js";
import UsuariosDTO from "../dto/usuarios.dto.js";

class Repository {
  constructor(manager, Dto) {
    this.manager = manager;
    this.Dto = Dto
  }

  buscarRegistros = async (filter) =>
    await this.manager.buscarRegistros(filter);
  buscarRegistroPorId = async (id) =>
    await this.manager.buscarRegistroPorId(id);
  crearRegistro = async (data) =>
    await this.manager.crearRegistro(new this.Dto(data));
  actualizarRegistroPorId = async (id, data) =>
    await this.manager.actualizarRegistroPorId(id, data);
  eliminarRegistroPorId = async (id) =>
    await this.manager.eliminarRegistroPorId(id);
  buscarPor = async (filter) => await this.manager.buscarPor(filter);
}

const productosRepository = new Repository(productosManager, ProductosDTO);
const carritosRepository = new Repository(carritosManager, CarritosDTO);
const usuariosRepository = new Repository(usuariosManager, UsuariosDTO);

export { productosRepository, carritosRepository, usuariosRepository };
