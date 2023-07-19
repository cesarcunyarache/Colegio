import { mensaje } from "../js/mensaje.js";
import {
  agregarTallas,
  getListaTallaProducto,
  eliminarTalla,
  setListaTallaProducto,
  setListaTallaProductoActualizar,
  agregarActualizacion,
  getListaConcat,
  getListaTallasProductoActualizar,
  eliminarTallaActualizar,
  actualizarTallaLista,
  buscarTallaId,
} from "../models/ListaTallasProducto.js";

import { TallaProducto } from "../models/tallaProductoDTO.js";
import { Categoria } from "../models/categoriaDTO.js";
import { Producto } from "../models/productoDTO.js";

let productoDTO = null;
const listaTallas = [];
let listaCategoria = [];
let actualizar = false;

const btnAgregarTalla = document.getElementById("agregarTalla");
const btnAgregarProducto = document.getElementById("agregarProducto");
const btnActualizarProducto = document.getElementById("actualizarProducto");
const btnNuevoProducto = document.getElementById("nuevoProducto");
const btnActualizarTalla = document.getElementById("action_buttonEditTalla");

btnAgregarTalla.addEventListener("click", function (event) {
  AgregarTallaTabla();
});

btnAgregarProducto.addEventListener("click", function (event) {
  AgregarProducto();
});

btnActualizarProducto.addEventListener("click", function (event) {
  ActualizarProducto();
});

btnNuevoProducto.addEventListener("click", function (event) {
  limpiarFormulario();
});

btnActualizarTalla.addEventListener("click", function (event) {
  event.preventDefault();
  actualizarTalla();
});

function cargarSelect() {
  let producto = $("#productos").val();
  if (producto != -1) {
    let tallas = document.querySelector("#tallas");
    let opciones = `<option value="-1">Seleccione una talla</option>`;
    $.ajax({
      url: "/tallas/read",
      method: "GET",
      dataType: "JSON",
      success: function (data) {
        console.log(data);
        for (var i = 0; i < data.length; i++) {
          listaTallas.push(data[i]);

          opciones += `<option value="${data[i].IdTalla}">${data[i].Talla}</option>`;
        }
        console.log(listaTallas);
        tallas.innerHTML = opciones;
      },
    });
  }
}

cargarSelect();
cargarCategorias();

function cargarCategorias() {
  let categoria = document.querySelector("#categoria");
  let opciones = `<option value="-1">Seleccione una categoria</option>`;
  $.ajax({
    url: "/categoria/read",
    method: "GET",
    dataType: "JSON",
    success: function (data) {
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        listaCategoria.push(data[i]);
        opciones += `<option value="${data[i].IdCategoria}">${data[i].nombre}</option>`;
      }

      categoria.innerHTML = opciones;
    },
  });
}

function AgregarTallaTabla() {
  let agregado = false;
  let nombreProduto = $("#nombreProducto").val();
  let IdTalla = $("#tallas").val();
  let precio = $("#precio").val();
  let stock = $("#stock").val();

  if (nombreProduto !== "" && IdTalla !== -1 && precio != "" && stock != "") {
    const talla = new TallaProducto(null, null, IdTalla, precio, stock);

    let key = 1;
    if (getListaTallaProducto().length > 0) {
      if (getListaTallaProducto()[0].Id != null) {
        key = 2;
      }
    }
    switch (key) {
      case 1:
        agregado = agregarTallas(talla);
        break;
      case 2:
        agregado = agregarActualizacion(talla);
        break;
      default:
        break;
    }
    if (agregado) {
      if (key == 2) {
        llenarTablaTallasActualizar();
        console.log(getListaTallaProducto());
        console.log(getListaTallasProductoActualizar());
      } else {
        llenarTablaTallas();
      }
    } else {
      mensaje("El producto ya cuenta con esa talla", "warning");
    }
  } else {
    mensaje("Uno o más campos vacios", "warning");
  }
}

function llenarTablaTallas() {
  const body = document.querySelector("#dtBody");
  let lista = getListaTallaProducto();

  let out = ``;
  for (let i = 0; i < lista.length; i++) {
    let index = buscarTalla(lista[i].IdTalla);
    if (index != null) {
      let nombreTalla = listaTallas[index].Talla;
      out += `
            <tr>
            <td>${nombreTalla}</td>
            <td>${lista[i].Precio}</td>
            <td>${lista[i].Stock}</td>
            <td>
                    <button id="btn-eliminar" value="${lista[i].IdTalla}" class="btn btn-sm btn-danger btn-eliminar"><i class="fa-solid fa-trash-can"></i></button>
                    <button id="btn-editat" value="${lista[i].IdTalla}" class="btn btn-sm btn-primary btn-actualizar"><i class="fa-solid fa-pencil"></i></button>
            </td>

            </tr>
        `;
    } else {
      mensaje("No encontrado", "warning");
    }
  }
  body.innerHTML = out;

  const btnEliminar = document.querySelectorAll(".btn-eliminar");
  btnEliminar.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const id = event.currentTarget.value;
      eliminarTalla(parseInt(id));
      llenarTablaTallas();
    });
  });

  const btnActual = document.querySelectorAll(".btn-actualizar");
  btnActual.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const id = event.currentTarget.value;
      modalTwo(id);
      llenarTablaTallas();
    });
  });
}

function buscarTalla(IdTalla) {
  for (let key in listaTallas) {
    if (listaTallas[key].IdTalla == IdTalla) {
      return key;
    }
  }
  return null;
}

function AgregarProducto() {
  let nombreProduto = $("#nombreProducto").val();
  let genero = $("#genero").val();
  let categoria = $("#categoria").val();
  let descripcion = $("#descripcion").val();

  const lista = getListaTallaProducto();
  if (productoDTO == null) {
    if (nombreProduto != "") {
      if (genero != -1) {
        if (categoria != -1) {
          if (descripcion != "") {
            if (lista.length > 0) {
              try {
                const body = {
                  Nombre: nombreProduto,
                  Descripcion: descripcion,
                  Genero: genero,
                  IdCategoria: categoria,
                };

                $.ajax({
                  url: "/productos/create/",
                  method: "POST",
                  data: body,
                  success: function (res) {
                    crearTallaProducto(res, getListaTallaProducto());
                    limpiarFormulario();
                    createTable();
                    mensaje("Producto agregado correctamente", "success");
                  },
                });
              } catch (e) {
                console.log(e);
              }
            } else {
              mensaje("Lista de tallas vacia", "warning");
            }
          } else {
            mensaje("Ingrese una descripcion para el producto", "warning");
          }
        } else {
          mensaje("Seleccione la categoria", "warning");
        }
      } else {
        mensaje("Seleccione el género", "warning");
      }
    } else {
      mensaje("Ingrese el nombre del producto", "warning");
    }
  } else {
    mensaje("Acción invalida", "warning");
  }
}

function crearTallaProducto(IdProducto, Lista) {
  const lista = Lista;
  try {
    for (let value of lista) {
      const body = {
        IdProducto: IdProducto,
        IdTalla: value.IdTalla,
        Precio: value.Precio,
        Stock: value.Stock,
      };

      console.log(body);
      $.ajax({
        url: "/tallaProducto/create",
        method: "POST",
        data: body,
        success: function (res) {
          if (res.messageError) {
            console.log(res.messageError);
          } else {
            console.log(res.message);
          }
        },
      });
    }
  } catch (e) {
    console.log(e);
  }
}

createTable();

function createTable() {
  var xmlhttp = new XMLHttpRequest();
  var url = "/productos/read";
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      console.log(data);
      var i = 1;
      $("#datatable_users").DataTable({
        lengthMenu: [5, 10, 15, 20, 100, 200, 500],
        columnDefs: [
          { className: "centered", targets: [0, 1, 2, 3, 4, 5] },
          { orderable: false, targets: [0, 2, 3, 4] },
          { searchable: false, targets: [] },
          //{ width: "50%", targets: [0] }
        ],
        pageLength: 5,

        destroy: true,
        language: {
          lengthMenu: "Mostrar _MENU_ registros por página",
          zeroRecords: "Ningún usuario encontrado",
          info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
          infoEmpty: "Ningún usuario encontrado",
          infoFiltered: "(filtrados desde _MAX_ registros totales)",
          search: "Buscar:",
          loadingRecords: "Cargando...",
          paginate: {
            first: "Primero",
            last: "Último",
            next: "Siguiente",
            previous: "Anterior",
          },
        },
        //"ajax": "data/objects.txt",
        data: data,
        columns: [
          /*   { render: function(){return a = i++} }, */
          { data: "Nombre" },
          { data: "Descripcion" },
          {
            data: "IdProducto",
            render: function (data, type, row) {
              var selectId = "select_" + row.IdProducto;
              return (
                '<select id="' + selectId + '" class="input_field"></select>'
              );
            },
          },
          { data: "Genero" },
          {
            data: "IdCategoria",
            render: function (data, type, row) {
              if (data == 1) {
                return "Uniforme Formal";
              } else {
                return "Uniforme de Educación Física";
              }
            },
          },
          {
            render: function (data, type, row) {
              return (
                '<button class="btn btn-sm btn-primary edit-btn" data-id="' +
                row.IdProducto +
                '"><i class="fa-solid fa-pencil"></i></button>'
              );
            },
          },
        ],
        initComplete: function () {
          var api = this.api();

          api.rows().every(function () {
            var rowData = this.data();
            var selectId = "select_" + rowData.IdProducto;

            crearSelectTable(rowData.IdProducto, function (opciones) {
              $("#" + selectId).html(opciones);
            });
          });
        },
      });
    }
  };
  const btnEditar = document.querySelectorAll(".btn-editarProducto");
  btnEditar.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const id = event.currentTarget.value;
    });
  });
}

function crearSelectTable(IdProducto, callback) {
  const lista = [];
  let opciones = ``;
  try {
    $.ajax({
      url: "/tallaProducto/read/" + IdProducto,
      method: "GET",
      dataType: "JSON",
      success: function (data) {
        for (var i = 0; i < data.length; i++) {
          opciones += `<option value="${i}">${data[i].Talla}</option>`;
          lista.push(data[i]);
        }
        callback(opciones);
      },
      error: function (xhr, status, error) {
        console.log("Error de envío de datos: ", error);
      },
    });
  } catch (e) {
    console.log(e);
  }
}

/* ----------------------------------------------------------------

Actualizar un producto

*/

function listarTallasProductoActualizar(IdProducto, callback) {
  const lista = [];
  try {
    $.ajax({
      url: "/tallaProducto/read/" + IdProducto,
      method: "GET",
      dataType: "JSON",
      success: function (data) {
        for (var i = 0; i < data.length; i++) {
          const talla = new TallaProducto(
            data[i].Id,
            data[i].IdProducto,
            data[i].IdTalla[0],
            data[i].Precio,
            data[i].Stock
          );
          lista.push(talla);
        }
        callback(lista);
      },
      error: function (xhr, status, error) {
        console.log("Error de envío de datos: ", error);
      },
    });
  } catch (e) {
    console.log(e);
  }
}

function llenarTablaTallasActualizar() {
  const body = document.querySelector("#dtBody");
  let lista = getListaConcat();
  let out = ``;
  for (let i = 0; i < lista.length; i++) {
    let index = buscarTalla(lista[i].IdTalla);
    if (index != null) {
      let nombreTalla = listaTallas[index].Talla;
      if (lista[i].Id != null) {
        out += `
            <tr>
            <td>${nombreTalla}</td>
            <td>${lista[i].Precio}</td>
            <td>${lista[i].Stock}</td>
            <td>  
                 <button id="btn-editar" value="${lista[i].Id}" class="btn btn-sm btn-primary btn-editar"><i class="fa-solid fa-pencil"></i></button>
            </td>

            </tr>
        `;
      } else {
        out += `
        <tr>
        <td>${nombreTalla}</td>
        <td>${lista[i].Precio}</td>
        <td>${lista[i].Stock}</td>
        <td>
                <button id="btn-eliminar" value="${lista[i].IdTalla}" class="btn btn-sm btn-danger btn-eliminar"><i class="fa-solid fa-trash-can"></i></button>
                <button id="btn-editar" value="${lista[i].IdTalla}" class="btn btn-sm btn-primary btn-actualizar"><i class="fa-solid fa-pencil"></i></button>
        </td>
        </tr>
    `;
      }
    } else {
      mensaje("No encontrado", "warning");
    }
  }
  body.innerHTML = out;

  const btnEliminar = document.querySelectorAll(".btn-eliminar");
  btnEliminar.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const id = event.currentTarget.value;
      eliminarTallaActualizar(parseInt(id));
      llenarTablaTallasActualizar();
    });
  });

  const btnEditar = document.querySelectorAll(".btn-editar");
  btnEditar.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const id = event.currentTarget.value;
      modal(id);
      llenarTablaTallasActualizar();
    });
  });

  const btnActual = document.querySelectorAll(".btn-actualizar");
  btnActual.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const id = event.currentTarget.value;
      modalTwo(id);
      llenarTablaTallasActualizar();
    });
  });
}

$(document).on("click", ".edit-btn", function () {
  var IdProducto = $(this).data("id");
  try {
    $.ajax({
      url: "/productos/search/" + IdProducto,
      method: "GET",
      dataType: "JSON",
      success: function (data) {
        $("#nombreProducto").val(data.Nombre);
        $("#descripcion").val(data.Descripcion);
        $("#genero").val(data.Genero);
        $("#categoria").val(data.IdCategoria);

        productoDTO = new Producto(
          data.IdProducto,
          data.Nombre,
          data.Descripcion,
          data.Genero,
          data.IdCategoria
        );
        listarTallasProductoActualizar(IdProducto, function (res) {
          console.log(res);
          setListaTallaProducto(res);
          llenarTablaTallasActualizar();
        });
      },
      error: function (xhr, status, error) {
        console.log("Error de envío de datos: ", error);
      },
    });
  } catch (e) {
    console.log(e);
  }
});

function modal(id) {
  $("#tituloEditarTalla").text("Actualizar información de la talla");

  $("actionEditTalla").val("Edit");

  $("#action_buttonEditTalla").text("Actualizar");

  $("#action_modalEditData").modal("show");

  $.ajax({
    url: "/tallaProducto/search/" + id,
    method: "GET",
    dataType: "JSON",
    success: function (data) {
      let index = buscarTalla(data.IdTalla);
      let talla = listaTallas[index].Talla;
      $("#Id").val(data.Id);
      $("#tallaEdit").val(talla);
      $("#precioEdit").val(data.Precio);
      $("#stockEdit").val(data.Stock);
    },
  });
}

function modalTwo(id) {
  $("#tituloEditarTalla").text("Actualizar información de la talla");

  $("actionEditTalla").val("Edit");

  $("#action_buttonEditTalla").text("Actualizar");

  $("#action_modalEditData").modal("show");

  //obtener datos del producto a editar
  let obj = buscarTallaId(id);
  let index = buscarTalla(id);
  let talla = listaTallas[index].Talla;
  if (obj != null) {
    $("#Id").val("");
    $("#tallaEdit").val(talla);
    $("#precioEdit").val(obj.Precio);
    $("#stockEdit").val(obj.Stock);
  }
}

function actualizarTalla() {
  let id = $("#Id").val();
  let talla = $("#tallaEdit").val();
  let precio = $("#precioEdit").val();
  let stock = $("#stockEdit").val();
  let obj = buscarIdPorTalla(talla);

  if (id != "" && obj != null) {
    if (productoDTO != null) {
      const body = {
        Id: id,
        IdProducto: productoDTO.idProducto,
        IdTalla: obj.IdTalla,
        Precio: precio,
        Stock: stock,
      };

      $.ajax({
        url: "/tallaProducto/update",
        method: "PUT",
        data: body,
        success: function (res) {
          if (res.message) {
            let tallaProductoDto = new TallaProducto(
              id,
              productoDTO.idProducto,
              obj.IdTalla,
              precio,
              stock
            );
          
          if (actualizarTallaLista(tallaProductoDto)) {
              $("#action_modalEditData").modal("hide");
              llenarTablaTallasActualizar();
              mensaje(res.message, "success");
            }
          } else {
            mensaje(res.messageError, "warning");
          }
        },
      });
    }
  } else {
    if (obj != null) {
      let tallaProductoDto = new TallaProducto(
        null,
        null,
        parseInt(obj.IdTalla),
        precio,
        parseInt(stock)
      );
      if (actualizarTallaLista(tallaProductoDto)) {
        llenarTablaTallasActualizar();
        $("#action_modalEditData").modal("hide");
        mensaje("Se actualizó correctamente", "success");
      } else {
        mensaje("Error al actualizar", "warning");
      }
    }
  }
}

function buscarIdPorTalla(talla) {
  for (let value of listaTallas) {
    if (value.Talla == talla) {
      return value;
    }
  }
  return null;
}

function ActualizarProducto() {
  let nombreProduto = $("#nombreProducto").val();
  let genero = $("#genero").val();
  let categoria = $("#categoria").val();
  let descripcion = $("#descripcion").val();

  const lista = getListaTallasProductoActualizar();
  if (productoDTO != null) {
    if (nombreProduto != "") {
      if (genero != -1) {
        if (categoria != -1) {
          if (descripcion != "") {
            try {
              const body = {
                IdProducto: productoDTO.idProducto,
                Nombre: nombreProduto,
                Descripcion: descripcion,
                Genero: genero,
                IdCategoria: categoria,
              };

              $.ajax({
                url: "/productos/update/",
                method: "PUT",
                data: body,
                success: function (res) {
                  if (lista.length > 0) {
                    crearTallaProducto(
                      productoDTO.idProducto,
                      getListaTallasProductoActualizar()
                    );
                  }
                  limpiarFormulario();
                  createTable();
                  mensaje(res.message, "success");
                },
              });
            } catch (e) {
              console.log(e);
            }
          } else {
            mensaje("Ingrese una descripcion para el producto", "warning");
          }
        } else {
          mensaje("Seleccione la categoria", "warning");
        }
      } else {
        mensaje("Seleccione el género", "warning");
      }
    } else {
      mensaje("Ingrese el nombre del producto", "warning");
    }
  } else {
    mensaje("Seleccione un producto", "warning");
  }
}
function limpiarFormulario() {
  $("#nombreProducto").val("");
  $("#genero").val(-1);
  $("#categoria").val(-1);
  $("#descripcion").val("");
  $("#precio").val("");
  $("#stock").val("");
  productoDTO = null;
  setListaTallaProducto([]);
  setListaTallaProductoActualizar([]);
  llenarTablaTallas();
}
