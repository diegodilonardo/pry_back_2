const { PERSISTENCE } = process.env;

let dao = {};

switch (PERSISTENCE) {
  case "memory":
    /* si la pesistencia es la memoria */
    /* debo cargar el objeto dao con los daos de la memoria */
    {
      console.log("Memoria disponible y conectada para desarrollar");
      const { productosManager, carritosManager, usuariosManager } = await import(
        "./memory/dao.memory.js"
      );
      dao = { productosManager, carritosManager, usuariosManager };
    }
    break;
  case "fs":
    /* si la pesistencia es los archivos */
    /* debo cargar el objeto dao con los daos de los archivos */
    {
      console.log("Conexion Exitosa a los archivos de datos");
      const { productosManager, carritosManager, usuariosManager } = await import(
        "./fs/dao.fs.js"
      );
      dao = { productosManager, carritosManager, usuariosManager };
    }
    break;
  //case "mysql":
  //break
  default: /* por defecto vamos a dejar mongo */
    {
      console.log("Base de datos de Mongo conectada con éxito");
      const { productosManager, carritosManager, usuariosManager } = await import(
        "./mongo/dao.mongo.js"
      );
      dao = { productosManager, carritosManager, usuariosManager };
    }
    break;
}

const { productosManager, carritosManager, usuariosManager } = dao;
export { productosManager, carritosManager, usuariosManager };
export default dao;