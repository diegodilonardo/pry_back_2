const { PERSISTENCE } = process.env;
import crypto from "crypto";
import { crearHash } from "../helpers/hash.helper.js";

class UsuariosDTO {
  constructor(data) {
    if (PERSISTENCE !== "mongo") {
      this._id = crypto.randomBytes(12).toString("hex");
    }
    this.nombre = data.nombre;
    this.fecha_nacimiento = data.fecha_nacimiento;
    this.ciudad = data.ciudad;
    this.email = data.email;
    this.password = crearHash(data.password);
    this.avatar =
      data.avatar ||
      "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg";
    this.rol = data.rol || "Usuario";
    this.codigo_verificacion = data.codigo_verificacion || crypto.randomBytes(12).toString("hex");
    if (PERSISTENCE !== "mongo") {
      this.verificado = data.verificado || false, 
      this.createdAt = new Date();
      this.updateAt = new Date();
    }
  }
}
export default UsuariosDTO;
