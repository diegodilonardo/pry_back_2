import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { usuariosRepository } from "../repositories/repository.js";
import { compararHash, crearHash } from "../helpers/hash.helper.js";
import { crearToken } from "../helpers/token.helper.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";

const callbackURL = "http://localhost:8080/api/autentificar/google/redirect";

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
        let user = await usuariosRepository.buscarPor({ email });
        if (user) {
            done(null, null, {
            message: "El usuario existe en la BD",
            statusCode: 401,
          });
        }
        
        user = await usuariosRepository.crearRegistro(req.body);
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
        let user = await usuariosRepository.buscarPor({ email }); //Datos desde Mongo
        if (!user) {
          /*  const error = new Error(
            "Datos Incorrectos. Debe Registrarse como usuario"
          );
          error.statusCode = 401;
          throw error;*/
          done(null, null, {
            message: "Credenciales Invalidas",
            statusCode: 401,
          });
        }
        const verificarPassword = compararHash(password, user.password);
        if (!verificarPassword) {
          /*  const error = new Error("Contraseña Incorrecta");
          error.statusCode = 401;
          throw error;*/
          done(null, null, {
            message: "Credenciales Invalidas",
            statusCode: 401,
          });
        }
        /* No se necesita session por que se trabaja con passport y jwt /*
            /* req.session.user_id = user._id; /*
            /* req.session.role = user.rol; /*
            /* req.session.email = user.email; */
        /* crear el token y enviarlo al cliente*/
        const data = {
          user_id: user._id,
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
        const user = await usuariosRepository.buscarPor({
          id: user_id,
          email,
          rol,
        });
        console.log(data);
        console.log(user);
        if (!user) {
          /*  const error = new Error("Acceso Denegado User");
          error.statusCode = 403;
          throw error;*/
          done(null, null, {
            message: "Usuario Acceso Denegado",
            statusCode: 403,
          });
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
        const user = await usuariosRepository.buscarPor({
          id: user_id,
          email,
          rol,
        });
        if (!user || user.rol !== "Administrador") {
          /* const error = new Error(
            "Acceso denegado, no tiene los permisos correspondientes."
          );
          error.statusCode = 403;
          throw error;*/
          done(null, null, {
            message: "Acceso denegado, no tiene los permisos correspondientes.",
            statusCode: 403,
          });
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.ID_CLIENTE_GOOGLE,
      clientSecret: process.env.SECRET_CLIENTE_GOOGLE,
      callbackURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log(profile);
        const { email, name, picture, id } = profile;
        let user = await usuariosRepository.buscarPor({ email: id });
        if (!user) {
          user = {
            email: id,
            name: name.givenName,
            avatar: picture,
            password: crearHash(email),
            ciudad: "Google",
          };
          user = await usuariosRepository.crearRegistro(user);
        }
        const data = {
          user_id: user.user_id,
          email: user.email,
          rol: user.rol,
        };
        const token = crearToken(data);
        user.token = token;

        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
export default passport;
