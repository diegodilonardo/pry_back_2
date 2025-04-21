import Producto from "../../models/producto.model.js";
import Carrito from "../../models/carrito.model.js";
import Usuario from "../../models/usuario.model.js";

class Manager {
  constructor(model) { 
    this.model = model;
  }
  crearProducto = async (data) => await this.model.create(data);
  buscarProductos = async (filter) => await this.model.find(filter).lean();

  buscarProductoPorId = async (id) => await this.model.findOne({ _id: id }).lean();

  buscarPor = async (filter) => await this.model.findOne(filter).lean();

  actualizarProductoPorId = async (id, data) => await this.model.findByIdAndUpdate(id, data, { new: true });
  eliminarProductoPorId = async (id) => await this.model.findByIdAndDelete(id);
}

const productosManager = new Manager(Producto);
const carritosManager = new Manager(Carrito);
const usuariosManager = new Manager(Usuario); 

export { productosManager, carritosManager, usuariosManager };
