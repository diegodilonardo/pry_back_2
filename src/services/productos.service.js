import { productosRepository } from "../repositories/repository.js"

const buscarRegistrosServices = async (filter) =>
  await productosRepository.buscarRegistros(filter);
const buscarRegistroPorIdServices = async (id) =>
  await productosRepository.buscarRegistroPorId(id);
const crearRegistroServices = async (data) =>
  await productosRepository.crearRegistro(data);
const actualizarRegistroPorIdServices = async (id, data) =>
  await productosRepository.actualizarRegistroPorId(id, data);
const eliminarRegistroPorIdServices = async (id) =>
  await productosRepository.eliminarRegistroPorId(id);

export {
  buscarRegistrosServices,
  buscarRegistroPorIdServices,
  crearRegistroServices,
  actualizarRegistroPorIdServices,
  eliminarRegistroPorIdServices,
};
