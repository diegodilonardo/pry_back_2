import crypto from "crypto";
const { PERSISTENCE } = process.env;

class ProductosDTO {
  constructor(data) {
    if (PERSISTENCE !== "mongo") {
      this._id = crypto.randomBytes(12).toString("hex");
    }
    this.nombre = data.nombre;
    this.descripcion = data.descripcioncion;
    this.categoria = data.categoria || "Calzado";
    this.imagen =
      data.imagen ||
      "https://www.shutterstock.com/image-vector/missing-picture-page-website-design-600nw-1552421075.jpg";
    this.precio = data.precio || 0;
    this.stock = data.stock || 0;
    this.color = data.color
    this.talle = data.talle
    this.modelo = data.modelo 
    this.activo = data.activo || false;
    this.sku = data.sku
    this.owner_id = data.owner_id;

    if (PERSISTENCE !== "mongo") {
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }
  }
}

export default ProductosDTO