import { mensaje } from "../js/mensaje.js";

const btnLogin = document.getElementById("login");

btnLogin.addEventListener("click", function (event) {
  event.preventDefault();
  Login();
});

function Login() {
  let usuario = $("#usuario").val();
  let contrasena = $("#contrasena").val();

  if (usuario != "") {
    if (contrasena != "") {
      const body = {
        Usuario: usuario,
        Contrasena: contrasena,
      };

      console.log(body);
      $.ajax({
        url: "/login",
        method: "POST",
        data: body,
        success: function (res) {
          if (res.messageError) {
            mensaje(res.messageError, "warning");;
          } else {
            window.location.href = "/ventas";
          }
        },
      });
    } else {
      mensaje("Ingrese la contraseña", "warning");
    }
  } else {
    mensaje("Ingrese el usuario", "warning");
  }
}
