const createSignedCB = (req, res, next) => {
  try {
    const maxAge = 7 * 24 * 60 * 60 * 1000;
    // const maxAge = 5 * 1000;
    const message = "Cookie Vence en 7 dias";
    return res
      .status(201)
      .cookie("user", "Diego", { maxAge, signed: true })
      .cookie("id", "19374682", { maxAge, signed: true })
      .json({ message });
  } catch (error) {
    next(error);
  }
};

const createCB = (req, res, next) => {
  try {
    const maxAge = 7 * 24 * 60 * 60 * 1000;
    // const maxAge = 5 * 1000;
    const message = "Cookie Vence en 7 dias";
    return res
      .status(201)
      .cookie("Modo", "dark", { maxAge })
      .cookie("Rol", "admin", { maxAge })
      .json({ message });
  } catch (error) {
    next(error);
  }
};

const readCB = (req, res, next) => {
  try {
    const cookies = req.cookies;
    return res.status(200).json({ cookies });
  } catch (error) {
    next(error);
  }
};

const readSignedCB = (req, res, next) => {
  try {
    const cookies = req.signedCookies;
    return res.status(200).json({ cookies });
  } catch (error) {
    next(error);
  }
};

const clearCB = (req, res, next) => {
  try {
    const message = "Cookie Eliminada";
    return res
      .status(200)
      .clearCookie("user")
      .clearCookie("Rol")
      .clearCookie("id")
      .clearCookie("Modo")
      .json({ message });
  } catch (error) {
    next(error);
  }
};

export {createCB,createSignedCB,readCB,readSignedCB,clearCB}