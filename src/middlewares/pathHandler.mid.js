const pathHandlers = (req, res, next) => {
  const error = "No se encontro la URL";
  const { method, originalUrl: url } = req;
  res.status(404).json({ error, method, url });
};

export default pathHandlers;
