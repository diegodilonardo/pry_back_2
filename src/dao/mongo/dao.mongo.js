import Producto from "../mongo/models/producto.model.js";
import Carrito from "../mongo/models/carrito.model.js";
import Usuario from "../mongo/models/usuario.model.js";

class Manager {
  constructor(model) { 
    this.model = model;
  }
  crearRegistro = async (data) => await this.model.create(data);
  buscarRegistros = async (filter) => await this.model.find(filter).lean();
  buscarRegistroPorId = async (id) => await this.model.findOne({ _id: id }).lean();
  buscarPor = async (filter) => await this.model.findOne(filter).lean();
  actualizarRegistroPorId = async (id, data) => await this.model.findByIdAndUpdate(id, data, { new: true });
  eliminarRegistroPorId = async (id) => await this.model.findByIdAndDelete(id);

}

const productosManager = new Manager(Producto);
const carritosManager = new Manager(Carrito);
const usuariosManager = new Manager(Usuario); 

export { productosManager, carritosManager, usuariosManager };