import { config } from "dotenv";
import argvsHelper from "./argvs.helper.js";

const modo = argvsHelper.mode;
const path = ".env." + modo;

config({ path });

const env = {
  PORT: process.env.PORT,
  LINK_BD: process.env.LINK_BD,
  SECRET: process.env.SECRET,
  ID_CLIENTE_GOOGLE: process.env.ID_CLIENTE_GOOGLE,
  SECRET_CLIENTE_GOOGLE: process.env.SECRET_CLIENTE_GOOGLE,
};

export default env;
