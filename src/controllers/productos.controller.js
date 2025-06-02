import {
  buscarRegistrosServices,
  buscarRegistroPorIdServices,
  crearRegistroServices,
  actualizarRegistroPorIdServices,
  eliminarRegistroPorIdServices,
} from "../services/productos.service.js";

const crearRegistro = async (req, res) => {
  const data = req.body;
  data.owner_id = req.user._id;
  const response = await crearRegistroServices(data);
  res.json201(response);
};
const buscarRegistros = async (req, res) => {
  const filter = req.query;
  const response = await buscarRegistrosServices(filter);
  if (response.length === 0) {
    res.json404();
  }
  res.json200(response);
};
const buscarRegistroPorId = async (req, res) => {
  const { id } = req.params;
  const response = await buscarRegistroPorIdServices(id);
  if (!response) {
    res.json404();
  }
  res.json200(response);
};
const actualizarRegistroPorId = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const response = await actualizarRegistroPorIdServices(id, data);
  if (!response) {
    res.json404();
  }
  res.json200(response);
};
const eliminarRegistroPorId = async (req, res) => {
  const { id } = req.params;
  const response = await eliminarRegistroPorIdServices(id);
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
