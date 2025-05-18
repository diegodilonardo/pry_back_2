const selector = document.querySelector("#opts");

const isOnline = async () => {
  try {
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const url = "/api/autentificar/online";
    let response = await fetch(url, opts);
    response = await response.json();
      
    if (response.error) {
      selector.innerHTML = `
      <a class="btn btn-secondary py-1 px-2 m-1" href="/registro/">Registro de Usuario</a>
      <a class="btn btn-secondary py-1 px-2 m-1" href="/login">Login de Usuario</a>`;
    } else {
      selector.innerHTML = `
      <a class="btn btn-secondary py-1 px-2 m-1" href="/perfil">Ver Perfil</a>
      <a class="btn btn-secondary py-1 px-2 m-1" href="/carrito">Carrito</a>
      <button class="btn btn-secondary py-1 px-2 m-1" id="signout">Sign out</button>
      <a>Usuario Logueado</a>
       `;
      document.querySelector("#signout").addEventListener("click", async () => {
        try {
          const opts = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              
            },
          };
          const url = "/api/autentificar/signout";
          await fetch(url, opts);
          localStorage.removeItem("token");
          location.replace("/");
        } catch (error) {
          console.log(error);
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

isOnline();
