import "dotenv/config.js";
import express from "express";
import { engine } from "express-handlebars";
import __dirname from "./utils.js";
import morgan from "morgan";
import indexRouter from "./src/routers/index.router.js";
import pathHandlers from "./src/middlewares/pathHandler.mid.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import bdConexion from "./src/helpers/BDConexion.helper.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";

/*server settings - Configuraciones de servidor */

const servidor = express();
const port = process.env.PORT || 8080;
const ready = async () => {
  console.log("Servidor Iniciado Correctamente en el puerto " + port);
  await bdConexion(process.env.LINK_BD);
};
servidor.listen(port, ready);

/* Engine settings - Moton de Plantillas */

servidor.engine("handlebars", engine());
servidor.set("view engine", "handlebars");
servidor.set("views", __dirname + "/src/views");

/* middlewares settings */
servidor.use(cookieParser(process.env.SECRET));
servidor.use(express.json());
servidor.use(express.urlencoded({ extended: true }));
servidor.use(express.static("public"));
servidor.use(morgan("dev"));

/* Session Settings*/

servidor.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookies: { maxAge: 60 * 1000 },
    store: new MongoStore({
      mongoUrl: process.env.LINK_BD,
      // collectionName: "sessions",
    }),
  })
);

/* routers settings */
servidor.use("/", indexRouter);
servidor.use(errorHandler);
servidor.use(pathHandlers);


