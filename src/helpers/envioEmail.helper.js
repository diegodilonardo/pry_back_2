import { createTransport } from "nodemailer";

const transport = createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GOOGLE_EMAIL,
    pass: process.env.GOOGLE_PASS_APP,
  },
});

const enviarMail = async (email) => {
  try {
    await transport.sendMail({
      from: process.env.GOOGLE_EMAIL,
      to: email,
      subject: "Mail de Prueba",
      html: "<h1>Correo de Prueba con Nodemailer</h1>",
    });
  } catch (error) {
    throw error;
  }
};

export { transport };
export default enviarMail;
