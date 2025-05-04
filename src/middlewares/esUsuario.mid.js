const esUsuario = (req, res, next) => {
  try {
    if (req.session.user_id) {
      const { user_id, email, rol } = req.session;
      req.user = { user_id, email, rol };
      next();
    } else {
      const error = new Error("Datos Invalidos");
      error.statusCode = 400;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

export default esUsuario;
