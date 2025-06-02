import { productosManager } from "../data/managers/mongo/manager.mongo.js";

const buscarRegistrosServices = async (filter) =>
  await productosManager.buscarRegistros(filter);
const buscarRegistroPorIdServices = async (id) =>
  await productosManager.buscarRegistroPorId(id);
const crearRegistroServices = async (data) =>
  await productosManager.crearRegistro(data);
const actualizarRegistroPorIdServices = async (id, data) =>
  await productosManager.actualizarRegistroPorId(id, data);
const eliminarRegistroPorIdServices = async (id) =>
  await productosManager.eliminarRegistroPorId(id);

export {
  buscarRegistrosServices,
  buscarRegistroPorIdServices,
  crearRegistroServices,
  actualizarRegistroPorIdServices,
  eliminarRegistroPorIdServices,
};
