const createCb = (req, res, next) => {
  try {
    req.session.role = "Admin";
    req.session.mode= "Dark";
    req.session.user = "Diego";
    const message = "La Sesion Vence en 7 Dias";
    return res.status(201).json({ message });
  } catch (error) {
    next(error);
  }
};

const readCb = (req, res, next) => {
  try {
    const session = req.session;
    return res.status(200).json({ session });
  } catch (error) {
    next(error);
  }
};

const clearCb = (req, res, next) => {
  try {
    req.session.destroy();
    const message = "Sesion eliminada ";
    return res.status(200).json({ message });
  } catch (error) {
    next(error);
  }
};

export {createCb,readCb,clearCb}