import { transport } from "./envioEmail.helper.js";

const verificarMail = async (email, codigo_verificacion) => {
  try {
    await transport.sendMail({
      from: process.env.GOOGLE_EMAIL,
      to: email,
      subject: "Verificacion de Cuenta de Correo Electrónico",
      html: `
      <h1>Codigo de Verificación de Cuenta: ${codigo_verificacion} </h1>
      <a href="http://localhost:8000/verificarUsuario/${email}"> Verificar Cuenta de Correo
            `,
    });
  } catch (error) {
    throw error;
  }
};

export default verificarMail;
