document.querySelector("#btnregistro").addEventListener("click", async () => {
    try {
      const data = {
        nombre: document.querySelector("#name").value,
        date: document.querySelector("#date").value,
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value,
        avatar: document.querySelector("#avatar").value,
        ciudad: document.querySelector("#ciudad").value,
      };
      const opts = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      const url = "/api/autentificar/registro";
      let response = await fetch(url, opts);
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