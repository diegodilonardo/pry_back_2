import { genSaltSync, hashSync, compareSync } from "bcrypt";

const crearHash = (pass) => hashSync(pass, genSaltSync(10));
const compararHash = (pass, bdPassword) => compareSync(pass, bdPassword);

export { crearHash, compararHash };
