document.querySelector("#btnresetear").addEventListener("click", async () => {
  const email = document.querySelector("#correousuario").value;
  const newpassword = document.querySelector("#new_password").value;
  const verifypassword = document.querySelector("#verify_password").value;
  if (newpassword != verifypassword) {
    alert("Los passwords ingresados no coinciden, vuelva a intentarlo..");
  } else {
    try {
      const url = `/api/autentificar/resetear-password-publico/${email}/${newpassword}`;
      let response = await fetch(url);
      response = await response.json();
      if (response.error) {
        alert(response.error);
      } else {
        location.replace("/login");
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  }
});
