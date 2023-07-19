let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");

closeBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  menuBtnChange();
});

/* searchBtn.addEventListener("click", ()=>{ 
  sidebar.classList.toggle("open");
  menuBtnChange(); 
}); */

function menuBtnChange() {
  if (sidebar.classList.contains("open")) {
    closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
  } else {
    closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
  }
}

let link = document.getElementById("render");
/* 
link.addEventListener("click", function (event) {
  $.ajax({
    url: "/clientes/",
    method: "GET",
    success: function (response) {
      $("#home-section").html(response);
    },
    error: function (error) {
      console.log("Error al cargar la vista: ", error);
    },
  });
}); */

let logout = document.getElementById("log_out");
logout.addEventListener("click", function (event) {
  $.ajax({
    url: "/logout/",
    method: "POST",
    success: function (response) {
      window.location.href = "/login";
    },
    error: function (error) {
      console.log(error);
    },
  });
});

$.ajax({
  url: "/profile/",
  method: "GET",
  success: function (response) {
    const parte = response[0].NombresApellidos.split(" ");

    const nombres = document.getElementById("nombresProfile");
    nombres.innerHTML = parte[0];

    const apellidos = document.getElementById("apellidosProfile");
    apellidos.innerHTML = parte[1];
  },
  error: function (error) {
    console.log("Error al cargar la vista: ", error);
  },
});


