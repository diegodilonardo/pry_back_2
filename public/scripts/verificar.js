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
      location.replace("/");
    }
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
});
