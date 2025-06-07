import { connect } from "mongoose";

const bdConexion = async (link) => {
  try {
    await connect(link);
  } catch (error) {
    console.log(error);
  }
};

export default bdConexion;
