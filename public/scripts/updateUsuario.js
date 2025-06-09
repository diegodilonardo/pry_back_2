document.querySelector("#btnactualizar").addEventListener("click", async () => {
  try {
    const data = {};
    const nombre = document.querySelector("#nombre").value;
    if (nombre) {
      data.nombre = nombre;
    }
    const date = document.querySelector("#fecha_nacimiento").value;
    if (date) {
      data.fecha_nacimiento = date;
    }
    const avatar = document.querySelector("#avatar").value;
    if (avatar) {
      data.avatar = avatar;
    }
    const ciudad = document.querySelector("#ciudad").value;
    if (ciudad) {
      data.ciudad = ciudad;
    }
    const opts = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const url = "/api/usuarios";
    let response = await fetch(url, opts);
    response = await response.json();
    
    if (response.error) {
      alert(response.error);
    } else {
      location.replace("/perfil");
    }
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
});
