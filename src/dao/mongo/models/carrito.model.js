import { Schema, model, Types } from "mongoose";

const collection = "Carritos";
const schema = new Schema(
  {
    producto_id: { type: Types.ObjectId, ref: "productos", required: true },
    usuario_id: {
      type: Types.ObjectId,
      ref: "usuarios",
      required: true,
      index: true,
    },
    cantidad: { type: Number, default: 1 },
    estado: {
      type: String,
      default: "Reservado",
      enum: ["Reservado, Pagado, Entregado"],
      index: true,
    },
  },
  { timestamps: true }
);
schema.pre(/^find/, function () {
  this.populate("usuario_id", "email_avatar").populate(
    "producto_id",
    "nombre precio stock"
  );
});

const Carrito = model(collection, schema);
export default Carrito;
