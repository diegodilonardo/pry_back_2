import { connect } from "mongoose";

const bdConexion = async (link) => {
  try {
    await connect(link);
    console.log("Base de datos conectada con éxito");
  } catch (error) {
    console.log(error);
  }
};

export default bdConexion;
