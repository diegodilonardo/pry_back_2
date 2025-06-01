import { usuariosManager } from "../data/managers/mongo/manager.mongo.js";
import { verificarToken } from "../helpers/token.helper.js";

const setupPolicies = (politicas) => async (req, res, next) => {
  try {
    if (politicas.includes("Publico")) return next();
    const token = req?.cookies?.token;
    if (!token) return res.json401();
    const data = verificarToken(token);
    const { user_id, email, rol } = data;
    console.log(data)
    if (!user_id || !email || !rol) return res.json401();
    console.log(data)
    const rolesPermitidos = {
      Usuario: politicas.includes("Usuario"),
      Administrador: politicas.includes("Administrador"),
    };
    if (!rolesPermitidos[rol]) return res.json401();
    console.log([rol])
    const user = await usuariosManager.buscarRegistroPorId(user_id);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default setupPolicies;
