import { Schema, model } from "mongoose";

const collection = "Usuarios";
const schema = new Schema(
  {
    nombre: { type: String },
    fecha_nacimiento: { type: Date },
    ciudad: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    avatar: { type: String },
    rol: {
      type: String,
      default: "Usuario",
      enum: ["Usuario", "Administrador", "Premium"],
      index: true,
    },
  },
  { timestamps: true }
);

const Usuario = model(collection, schema);
export default Usuario;
