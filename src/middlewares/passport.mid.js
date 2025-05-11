import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { usuariosManager } from "../data/managers/mongo/manager.mongo.js";
import { compararHash, crearHash } from "../helpers/hash.helper.js";
import { crearToken } from "../helpers/token.helper.js";

passport.use(
  /* nombre de la estrategia de autenticacion/autorizacion */
  "registro",
  /* estrategia de autenticacion/autorizacion */
  new LocalStrategy(
    /* objeto de configuracion de la estrategia */
    { passReqToCallback: true, usernameField: "email" },
    /* callback con la logica necesaria para resolver la estrategia */
    async (req, email, password, done) => {
      try {
        if (!req.body.ciudad) {
          const error = new Error("Datos Invalidos");
          error.statusCode = 400;
          throw error;
        }
        let user = await usuariosManager.buscarPor({ email });
        if (user) {
          const error = new Error("Datos Incorrectos");
          error.statusCode = 401;
          throw error;
        }
        req.body.password = crearHash(password);
        user = await usuariosManager.crearRegistro(req.body);
        done(null, user);
        /*el primer parametro de done es el error si ocurre*/
        /* el segundo parametro son los datos del usuario que se guardan en el objeto de requerimiento*/
        /* a partir de que se aplica este middleware: todos los datos del usuario existen en req.user (Datos de la Base de datos)
         passport lo resuelve*/
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  /* nombre de la estrategia de autenticacion/autorizacion */
  "login",
  /* estrategia de autenticacion/autorizacion */
  new LocalStrategy(
    /* objeto de configuracion de la estrategia */
    { passReqToCallback: true, usernameField: "email" },
    /* callback con la logica necesaria para resolver la estrategia */
    async (req, email, password, done) => {
      try {
        let user = await usuariosManager.buscarPor({ email }); //Datos desde Mongo
        if (!user) {
          const error = new Error("Datos Incorrectos. Debe Registrarse como usuario");
          error.statusCode = 401;
          throw error;
        }
        const verificarPassword = compararHash(password, user.password);
        if (!verificarPassword) {
          const error = new Error("Contraseña Incorrecta");
          error.statusCode = 401;
          throw error;
        }
        /* No se necesita session por que se trabaja con passport y jwt /*
            /* req.session.user_id = user._id; /*
            /* req.session.role = user.rol; /*
            /* req.session.email = user.email; */
        /* crear el token y enviarlo al cliente*/
        const data = {
          user_id: user.user_id,
          email: user.email,
          rol: user.rol,
        };
        const token = crearToken(data);
        user.token = token;
        done(null, user);
        console.log(data);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "user",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
      secretOrKey: process.env.SECRET,
    },
    async (data, done) => {
      try {
        const { user_id, email, rol } = data;
        const user = await usuariosManager.buscarPor({
          id: user_id,
          email,
          rol,
        });
        console.log(data);
        console.log(user);
        if (!user) {
          const error = new Error("Acceso Denegado User");
          error.statusCode = 403;
          throw error;
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "admin",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
      secretOrKey: process.env.SECRET,
    },
    async (data, done) => {
      try {
        const { user_id, email, rol } = data;
        const user = await usuariosManager.buscarPor({
          id: user_id,
          email,
          rol,
        });
        if (!user || user.rol !== "Administrador") {
          const error = new Error("Acceso denegado, no tiene los permisos correspondientes.");
          error.statusCode = 403;
          throw error;
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

export default passport;
