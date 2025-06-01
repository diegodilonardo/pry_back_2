const setupRespuestas = (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const mensajesError = {
      200: "Registro Encontrado",
      201: "Alta Exitosa",
      400: "Client Error",
      401: "Autorizacion Incorrecta",
      403: "Autorizacion Denegada, debe ser usuario Administrador",
      404: "Registro no Encontrado",
      500: "Server Error",
    };
    const successResponse = (code, response, message = mensajesError[code]) =>
      res.status(code).json({ method, url, response, message });
    const errorResponse = (code, errorMensaje = mensajesError[code]) => {
      const error = new Error(errorMensaje);
      error.statusCode = code;
      throw error;
    };
    res.json200 = (response, message) =>
      successResponse(200, response, message);
    res.json201 = (response, message) =>
      successResponse(201, response, message);
    res.json400 = (message) => errorResponse(400, message);
    res.json401 = (message) => errorResponse(401, message);
    res.json403 = (message) => errorResponse(403, message);
    res.json404 = (message) => errorResponse(404, message);
    res.json500 = (message) => errorResponse(500, response, message);
    next()
  } catch (error) {
    next(error);
  }
};

export default setupRespuestas;
