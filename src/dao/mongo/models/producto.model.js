import { Schema, Types, model } from "mongoose";

const collection = "Productos";
const schema = new Schema(
  {
    nombre: { type: String, required: true, index: true },
    descripcion: { type: String },
    categoria: {
      type: String,
      default: "Calzado",
      enum: ["Calzado", "Accesorios", "Indumentaria"],
    },
    imagen: { type: String },
    precio: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    activo: { type: Boolean, default: false },
    color: { type: String },
    talle: { type: String },
    modelo: { type: String },
    sku: {type: String},
    owner_id: { type: Types.ObjectId, ref: "Usuarios", index: true },
    
  },
  { timestamps: true }
);

schema.pre(/^find/, function () {
  this.populate("owner_id", "email avatar");
});

const Producto = model(collection, schema);
export default Producto;
