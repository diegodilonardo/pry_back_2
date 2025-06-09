import { usuariosRepository } from "../repositories/repository.js";
import envioMailHelper from "../helpers/envioEmail.helper.js";

const actualizarUsuario = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const data = req.body;
    const { _id } = req.user;
    const response = await usuariosRepository.actualizarRegistroPorId(
      _id,
      data
    );
    res.status(200).json({ response, method, url });
  } catch (error) {
    next(error);
  }
};

const envioMail = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const { email } = req.params;
    await envioMailHelper(email);
    res.status(200).json({ response: "Mail Enviado", method, url });
  } catch (error) {
    next(error);
  }
};
export { actualizarUsuario, envioMail };
