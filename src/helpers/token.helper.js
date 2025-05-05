import jwt from "jsonwebtoken";

const crearToken = (data) => {
  try {
    const token = jwt.sign(
      /* Informacion a tokenizar*/
      data,
      /*Necesita una clave secreta para encriptar*/
      process.env.SECRET,
      /* objeto de configuracion de la firma */
      { expiresIn: 7 * 24 * 60 * 60 }
    );
    return token;
  } catch (error) {
    error.statusCode = 401;
    throw error;
  }
};

const verificarToken = (token) => {
  try {
    const data = jwt.verify(
      /* token a verificar*/
      token,
      /*Necesita una clave secreta para desencriptar*/
      process.env.SECRET
    );
    return data;
  } catch (error) {
    error.statusCode = 403;
    throw error;
  }
};

export { crearToken, verificarToken };
