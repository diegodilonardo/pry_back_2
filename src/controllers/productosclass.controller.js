import productosServices from "../services/productos.service.js";

class ProductosController {
  constructor() {
    this.service = productosServices
  }
  crearRegistro = async (req, res) => {
    const data = req.body;
    data.owner_id = req.user._id;
    const response = await this.service.crearRegistro(data);
    res.json201(response);
  };
  buscarRegistros = async (req, res) => {
    const filter = req.query;
    const response = await this.service.buscarRegistrosServicies(filter);
    if (response.length === 0) {
      res.json404();
    }
    res.json200(response);
  };
  buscarRegistroPorId = async (req, res) => {
    const { id } = req.params;
    const response = await this.service.buscarRegistroPorIdServicies(id);
    if (!response) {
      res.json404();
    }
    res.json200(response);
  };
  actualizarRegistroPorId = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const response = await this.service.actualizarRegistroPorIdServicie(id, data);
    if (!response) {
      res.json404();
    }
    res.json200(response);
  };
  eliminarRegistroPorId = async (req, res) => {
    const { id } = req.params;
    const response = await this.service.eliminarRegistroPorIdServicie(id);
    if (!response) {
      res.json404();
    }
    res.json200(response);
  };
}

const productosController = new ProductosController();
const {
  crearRegistro,
  buscarRegistros,
  buscarRegistroPorId,
  actualizarRegistroPorId,
  eliminarRegistroPorId,
} = productosController;
export {
  crearRegistro,
  buscarRegistros,
  buscarRegistroPorId,
  actualizarRegistroPorId,
  eliminarRegistroPorId,
};
