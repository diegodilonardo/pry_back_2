import {productosServices} from "../services/services.js";

const crearRegistro = async (req, res) => {
  const data = req.body;
  data.owner_id = req.user._id;
  const response = await productosServices.crearRegistro(data);
  res.json201(response);
};
const buscarRegistros = async (req, res) => {
  const filter = req.query;
  const response = await productosServices.buscarRegistros(filter);
  if (response.length === 0) {
    res.json404();
  }
  res.json200(response);
};
const buscarRegistroPorId = async (req, res) => {
  const { id } = req.params;
  const response = await productosServices.buscarRegistroPorId(id);
  if (!response) {
    res.json404();
  }
  res.json200(response);
};
const actualizarRegistroPorId = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const response = await productosServices.actualizarRegistroPorId(id, data);
  if (!response) {
    res.json404();
  }
  res.json200(response);
};
const eliminarRegistroPorId = async (req, res) => {
  const { id } = req.params;
  const response = await productosServices.eliminarRegistroPorId(id);
  if (!response) {
    res.json404();
  }
  res.json200(response);
};

export {
  crearRegistro,
  buscarRegistros,
  buscarRegistroPorId,
  actualizarRegistroPorId,
  eliminarRegistroPorId,
};
