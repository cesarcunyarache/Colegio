import { mensaje } from "../js/mensaje.js";
import { Cliente } from "../models/clienteDTO.js";
import { Usuario } from "../models/usuarioDTO.js";
import { DetalleVenta } from "../models/detalleVentaDTO.js";
import { TallaProducto } from "../models/tallaProductoDTO.js";
import {
  AgregarProducto,
  getListaProductosVenta,
  EliminarProducto,
  getTotal,
  setListaProductoVenta,
} from "../models/ListaProductosVenta.js";

let listaCategoria = [];
let listaProductos = [];
let listaTallaProductos = [];
let listaTallas = [];
let cliente = null;
let usuario = null;

$.ajax({
  url: "/profile/",
  method: "GET",
  success: function (res) {
    usuario = new Usuario(
      res[0].IdUsuario,
      res[0].NombresApellidos,
      res[0].Usuario,
      "",
      res[0].Correo
    );
  },
  error: function (error) {
    console.log("Error al cargar la vista: ", error);
  },
});

cargarCategorias();
function cargarCategorias() {
  let categoria = document.querySelector("#categoria");
  let opciones = `<option value="-1">Seleccione una categoria</option>`;
  $.ajax({
    url: "/categoria/read",
    method: "GET",
    dataType: "JSON",
    success: function (data) {
      for (var i = 0; i < data.length; i++) {
        listaCategoria.push(data[i]);
        opciones += `<option value="${data[i].IdCategoria}">${data[i].nombre}</option>`;
      }
      categoria.innerHTML = opciones;
    },
  });
}

cargarListaTallaProductos();
function cargarListaTallaProductos() {
  try {
    listaTallaProductos = [];
    $.ajax({
      url: "/tallaProducto/read/",
      method: "GET",
      dataType: "JSON",
      success: function (data) {
        for (var i = 0; i < data.length; i++) {
          let tallaProducto = new TallaProducto(
            data[i].Id,
            data[i].IdProducto,
            data[i].IdTalla,
            data[i].Precio,
            data[i].Stock
          );
          listaTallaProductos.push(tallaProducto);
        }
      },
    });
  } catch (err) {
    console.log(err);
  }
}

cargarListaProductos();
function cargarListaProductos() {
  try {
    $.ajax({
      url: "/productos/read/",
      method: "GET",
      dataType: "JSON",
      success: function (data) {
        for (var i = 0; i < data.length; i++) {
          listaProductos.push(data[i]);
        }
      },
    });
  } catch (err) {
    console.log(err);
  }
}

cargarListaTallas();
function cargarListaTallas() {
  $.ajax({
    url: "/tallas/read",
    method: "GET",
    dataType: "JSON",
    success: function (data) {
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        listaTallas.push(data[i]);
      }
    },
  });
}

const buscarDniCliente = document.getElementById("dni");
buscarDniCliente.addEventListener("keyup", function (event) {
  if (event.key === "Enter" || event.keyCode === 13) {
    buscarClienteDNI();
  }
});

function buscarClienteDNI() {
  let dni = $("#dni").val();

  if (dni != null) {
    $.ajax({
      url: "/clientes/searchDNI/" + dni,
      method: "GET",
      dataType: "JSON",
      success: function (data) {
        if (data.message) {
          modalSaveCliente(dni);
        } else {
          cliente = new Cliente(
            data.IdCliente,
            data.Dni,
            data.Nombres,
            data.Apellidos,
            data.Telefono
          );
          console.log(cliente);
          $("#nombres").val(data.Nombres);
          $("#apellidos").val(data.Apellidos);
        }
      },
    });
  } else {
    mensaje("Ingrese el DNI del Cliente", "warning");
  }
}

function modalSaveCliente(dni) {
  $("#dynamic_modal_titleSave").text("Guardar información del Cliente");

  $("actionSave").val("Edit");

  $("#action_buttonSave").text("Guardar");

  $("#action_modalSave").modal("show");

  $("#dniSave").val(dni);
}

const btnAgregarCliente = document.getElementById("action_buttonSave");
btnAgregarCliente.addEventListener("click", function (event) {
  event.preventDefault();
  let dni = $("#dniSave").val();
  let nombres = $("#nombresSave").val();
  let apellidos = $("#apellidosSave").val();
  let telefono = $("#telefonoSave").val();

  if (dni != null && nombres != null && apellidos != null && telefono != null) {
    $.ajax({
      url: "/clients/create",
      method: "POST",
      data: {
        dni: dni,
        nombres: nombres,
        apellidos: apellidos,
        telefono: telefono,
      },
      success: function (res) {
        if (res.messageError) {
          alert(res.messageError);
        } else {
          $("#action_modalSave").modal("hide");
          $("#dniSave").val("");
          $("#nombresSave").val("");
          $("#apellidosSave").val("");
          $("#telefonoSave").val("");
        }
      },
    });
  } else {
    alert("Campos incompletos");
  }
});

const selectCategoria = document.getElementById("categoria");
selectCategoria.addEventListener("change", function (event) {
  const selectedValue = event.target.value;
  let genero = $("#genero").val();
  if (genero != -1) {
    cargarProductos(selectedValue, genero);
  } else {
    cargarProductos(selectedValue, -1);
  }
});

const selectGenero = document.getElementById("genero");
selectGenero.addEventListener("change", function (event) {
  const selectedValue = event.target.value;
  let categoria = $("#categoria").val();
  if (categoria != -1) {
    cargarProductos(categoria, selectedValue);
  } else {
    cargarProductos(-1, selectedValue);
  }
});

cargarProductos(-1, -1);

function cargarProductos(categoria, genero) {
  if (categoria != -1 && genero == -1) {
    let productos = document.querySelector("#productos");
    let opciones = `<option value="-1">Seleccione una producto</option>`;
    $.ajax({
      url: "/productos/readCategoria/" + categoria,
      method: "GET",
      dataType: "JSON",
      success: function (data) {
        for (var i = 0; i < data.length; i++) {
          opciones += `<option value="${data[i].IdProducto}">${data[i].Nombre}</option>`;
        }
        productos.innerHTML = opciones;
      },
    });
  } else if (categoria == -1 && genero != -1) {
    let productos = document.querySelector("#productos");
    let opciones = `<option value="-1">Seleccione una producto</option>`;
    $.ajax({
      url: "/productos/readGenero/" + genero,
      method: "GET",
      dataType: "JSON",
      success: function (data) {
        for (var i = 0; i < data.length; i++) {
          opciones += `<option value="${data[i].IdProducto}">${data[i].Nombre}</option>`;
        }
        productos.innerHTML = opciones;
      },
    });
  } else if (categoria != -1 && genero != -1) {
    let productos = document.querySelector("#productos");
    let opciones = `<option value="-1">Seleccione una producto</option>`;
    $.ajax({
      url: "/productos/readCategoriaGenero",
      method: "POST",
      dataType: "JSON",
      data: {
        IdCategoria: categoria,
        Genero: genero,
      },
      success: function (data) {
        for (var i = 0; i < data.length; i++) {
          opciones += `<option value="${data[i].IdProducto}">${data[i].Nombre}</option>`;
        }
        productos.innerHTML = opciones;
      },
    });
  } else {
    let productos = document.querySelector("#productos");
    let opciones = `<option value="-1">Seleccione una producto</option>`;
    $.ajax({
      url: "/productos/read",
      method: "GET",
      dataType: "JSON",
      success: function (data) {
        for (var i = 0; i < data.length; i++) {
          opciones += `<option value="${data[i].IdProducto}">${data[i].Nombre}</option>`;
        }
        productos.innerHTML = opciones;
      },
    });
  }
}

const selectProductos = document.getElementById("productos");
selectProductos.addEventListener("change", function (event) {
  const selectedValue = event.target.value;
  cargarSelectTallas(selectedValue);

  $("#precio").val("");
  $("#stock").val("");
});

cargarSelectTallas(-1);
function cargarSelectTallas(selectedValue) {
  console.log();
  let tallas = document.querySelector("#tallas");
  let opciones = `<option value="-1">Seleccione una talla</option>`;
  for (let value of listaTallaProductos) {
    if (value.IdProducto == selectedValue && value.Stock > 0) {
      let talla = buscarTalla(value.IdTalla);
      opciones += `<option value="${value.IdTalla}">${talla.Talla}</option>`;
    }
  }
  tallas.innerHTML = opciones;
}

function buscarTalla(idTalla) {
  for (let value of listaTallas) {
    if (value.IdTalla == idTalla) {
      return value;
    }
  }
  return null;
}

const selectTallas = document.getElementById("tallas");
selectTallas.addEventListener("change", function (event) {
  const selectedValue = event.target.value;
  let producto = $("#productos").val();
  infoProducto();
  if (selectedValue == -1) {
    $("#precio").val("");
    $("#stock").val("");
  }
});

function buscarTallaProducto(IdTalla, IdProducto) {
  for (let value of listaTallaProductos) {
    if (value.IdTalla == IdTalla && value.IdProducto == IdProducto) {
      return value;
    }
  }
  return null;
}

function restarStock(IdTalla, IdProducto, Cantidad) {
  for (let value of listaTallaProductos) {
    if (value.IdTalla == IdTalla && value.IdProducto == IdProducto) {
      if (value.Stock - Cantidad >= 0) {
        value.Stock -= Cantidad;
        return true;
      }
    }
  }
  return false;
}

function buscarProducto(idProducto) {
  for (let value of listaProductos) {
    if (value.IdProducto == idProducto) {
      return value;
    }
  }
  return null;
}

function infoProducto() {
  let IdProducto = $("#productos").val();
  let IdTalla = $("#tallas").val();
  let info = buscarTallaProducto(IdTalla, IdProducto);
  if (info != null) {
    $("#precio").val(info.Precio);
    $("#stock").val(info.Stock);
  } else {
    $("#precio").val("");
    $("#stock").val("");
  }
}

const btnAgregarProducto = document.getElementById("agregarProducto");
btnAgregarProducto.addEventListener("click", function (event) {
  event.preventDefault();
  agregarProducto();
});

function agregarProducto() {
  let dni = $("#dni").val();
  let producto = $("#productos").val();
  let talla = $("#tallas").val();
  let cantidad = $("#cantidad").val();
  if (dni != "") {
    if (cliente != null) {
      if (producto != -1) {
        if (talla != -1) {
          if (restarStock(talla, producto, cantidad)) {
            let data = buscarTallaProducto(talla, producto);
            if (data != null) {
              let detalleVenta = new DetalleVenta(
                null,
                data.IdProducto,
                data.IdTalla,
                data.Precio,
                parseInt(cantidad)
              );
              AgregarProducto(detalleVenta);
              infoProducto();
              cargarTablaProductos();
              Total();
            }
          } else {
            mensaje("Stock insuficiente", "warning");
          }
        } else {
          mensaje("Seleccione una talla", "warning");
        }
      } else {
        mensaje("Seleccione un producto", "warning");
      }
    } else {
      mensaje("El Cliente debe estar registrado", "warning");
    }
  } else {
    mensaje("Ingrese el DNI del Cliente", "warning");
  }
}

function cargarTablaProductos() {
  const body = document.querySelector("#dtBody");
  let lista = getListaProductosVenta();
  let out = ``;
  for (let i = 0; i < lista.length; i++) {
    let talla = buscarTalla(lista[i].IdTalla);
    let nombreProducto = buscarProducto(lista[i].IdProducto);
    if (talla.Talla != null) {
      out += `
            <tr>
            <td>${nombreProducto.Nombre}</td>
            <td>${talla.Talla}</td>
            <td>${lista[i].Precio}</td>
            <td>${lista[i].Cantidad}</td>
            <td>${lista[i].Importe}</td>
            <td>
                    <button id="btn-eliminar" value="${
                      lista[i].IdProducto + "-" + lista[i].IdTalla
                    }" class="btn btn-sm btn-danger btn-eliminar"><i class="fa-solid fa-trash-can"></i></button>
                  
            </td>

            </tr>
        `;
    }
  }
  body.innerHTML = out;

  const btnEliminar = document.querySelectorAll(".btn-eliminar");
  btnEliminar.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      let value = event.currentTarget.value;
      let Id = value.split("-");
      let result = EliminarProducto(Id[0], Id[1]);
      if (result != null) {
        sumarStock(result.IdProducto, result.IdTalla, result.Cantidad);
        infoProducto();
        cargarTablaProductos();
        Total();
      }
    });
  });
}

function sumarStock(IdProducto, IdTalla, Cantidad) {
  for (let value of listaTallaProductos) {
    if (value.IdTalla == IdTalla && value.IdProducto == IdProducto) {
      value.Stock += Cantidad;
    }
  }
}

function Total() {
  $("#total").val(getTotal());
}

const btnGenerarVenta = document.getElementById("generarVenta");
btnGenerarVenta.addEventListener("click", function (event) {
  event.preventDefault();
  modalConfirmarVenta();
});

function modalConfirmarVenta() {
  if (cliente != null) {
    if (getListaProductosVenta().length > 0) {
      const fecha = document.getElementById("fecha");
      let fechaActual = new Date().toLocaleDateString();
      fecha.innerHTML = fechaActual;

      const infoCliente = document.getElementById("cliente");
      infoCliente.innerHTML = cliente.Nombres + " " + cliente.Apellidos;

      const infoUsuario = document.getElementById("remitente");
      infoUsuario.innerHTML = usuario.nombresApellidos;

      const dtBoleta = document.querySelector("#dtBoleta");
      let lista = getListaProductosVenta();
      let out = ``;
      for (let i = 0; i < lista.length; i++) {
        let talla = buscarTalla(lista[i].IdTalla);
        let nombreProducto = buscarProducto(lista[i].IdProducto);
        if (talla.Talla != null) {
          out += `
            <tr>
            <td>${nombreProducto.Nombre}</td>
            <td>${talla.Talla}</td>
            <td>${lista[i].Precio}</td>
            <td>${lista[i].Cantidad}</td>
            <td>${lista[i].Importe}</td>
            </tr>
        `;
        }
      }
      dtBoleta.innerHTML = out;

      const total = document.getElementById("totalBoleta");
      total.innerHTML = getTotal();

      $("#tituloBoleta").text("Resumen");

      $("#actionGenerarBoleta").val("Edit");

      $("#action_buttonGenerarBoleta").text("Confirmar venta");

      $("#action_modalGenerarVenta").modal("show");
    } else {
      mensaje("Lista de productos vacia", "warning");
    }
  } else {
    mensaje("Informacion de cliente vacia", "warning");
  }
}

const btnConfirmarVenta = document.getElementById("action_buttonGenerarBoleta");
btnConfirmarVenta.addEventListener("click", function (event) {
  event.preventDefault();
  crearVenta();
});

function crearVenta() {
  try {
    const body = {
      IdCliente: cliente.idCliente,
      Total: getTotal(),
      IdUsuario: usuario.idUsuario,
    };

    $.ajax({
      url: "/ventas/create/",
      method: "POST",
      data: body,
      success: function (res) {
        crearDetallesVenta(res);
      },
    });
  } catch (error) {
    console.log(error);
  }
}

function crearDetallesVenta(IdVenta) {
  try {
    for (let value of getListaProductosVenta()) {
      const body = {
        IdVenta: IdVenta,
        IdProducto: value.IdProducto,
        IdTalla: value.IdTalla,
        Cantidad: parseInt(value.Cantidad),
        Importe: parseInt(value.Importe),
      };

      $.ajax({
        url: "/detalleVenta/create/",
        method: "POST",
        data: body,
        success: function (res) {
          console.log(res.message);
        },
      });
    }
    generarBoleta(IdVenta);
    $("#action_modalGenerarVenta").modal("hide");
    nuevaVenta();
    mensaje("Venta completada satisfactoriamente", "success");
  } catch (error) {
    console.log(error);
  }
}

function generarBoleta(IdVenta) {
  try {
    const numeroBoleta = document.getElementById("numeroBoleta");
    numeroBoleta.innerHTML = "BV-" + IdVenta;

    const content = document.getElementById("divElement").innerHTML; // <-- Aquí puedes elegir cualquier elemento del DOM
    html2pdf()
      .set({
        margin: 1,
        filename: "documento.pdf",
        image: {
          type: "jpeg",
          quality: 0.98,
        },
        html2canvas: {
          scale: 3, // A mayor escala, mejores gráficos, pero más peso
          letterRendering: true,
        },
        jsPDF: {
          unit: "in",
          format: "a3",
          orientation: "portrait", // landscape o portrait
        },
      })
      .from(content)
      .save()
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
}

const btnNuevaVenta = document.getElementById("nuevaVenta");
btnNuevaVenta.addEventListener("click", function (event) {
  event.preventDefault();
  nuevaVenta();
});

function nuevaVenta() {
  cliente = null;
  $("#dni").val("");
  $("#nombres").val("");
  $("#apellidos").val("");
  $("#categoria").val("-1");
  $("#genero").val("-1");
  $("#productos").val("-1");
  $("#tallas").val("-1");
  $("#precio").val("");
  $("#stock").val("");
  $("#cantidad").val("1");
  $("#total").val("0");
  cargarListaProductos();
  cargarListaTallas();
  cargarSelectTallas(-1);
  setListaProductoVenta([]);
  cargarTablaProductos()

}
