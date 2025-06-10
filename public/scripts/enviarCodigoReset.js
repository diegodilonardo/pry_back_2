document
  .querySelector("#btnenviarcodigo")
  .addEventListener("click", async () => {
    try {
      const email = document.querySelector("#correousuario").value;
      const url = `/api/autentificar/olvido-password/${email}`;
      let response = await fetch(url);
      response = await response.json();
      if (response.error) {
        alert(response.error);
      } else {
        alert(
          "Revise su casilla de mails e ingrese el codigo recibido para validar el correo"
        );
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  });
document.querySelector("#btnverificar").addEventListener("click", async () => {
  try {
    const email = document.querySelector("#correousuario").value;
    const codigoverificador =
      document.querySelector("#codigoverificador").value;
    const url = `/api/autentificar/verificar-email/${email}/${codigoverificador}`;
    let response = await fetch(url);
    response = await response.json();
    if (response.error) {
      alert(response.error);
    } else {
      location.replace(`/resetPasswordPublico/${email}/${codigoverificador}`);
    }
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
});
