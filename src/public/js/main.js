const dataTableOptions = {
  //scrollX: "2000px",
  lengthMenu: [5, 10, 15, 20, 100, 200, 500],
  columnDefs: [
    { className: "centered", targets: [0, 1, 2, 3, 4] },
    { orderable: false, targets: [] },
    { searchable: false, targets: [1] },
    { width: "100%", targets: [0, 2, 4] },
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
};

function createTable() {
  var xmlhttp = new XMLHttpRequest();
  var url = "/clients/read";
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
          { className: "centered", targets: [0, 1, 2, 3, 4] },
          { orderable: false, targets: [0, 3, 4] },
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
          { data: "Dni" },
          { data: "Nombres" },
          { data: "Apellidos" },
          { data: "Telefono" },
          {
            render: function (data, type, row) {
              return (
                '<button class="btn btn-sm btn-primary" onclick="modal(' +
                row.IdCliente +
                ')"><i class="fa-solid fa-pencil"></i></button> '
              );
            },
          },
        ],
      });
    }
  };
}

createTable();

function modal(id) {

  $("#dynamic_modal_title").text("Actualizad información del Cliente");

  $("#action").val("Edit");

  $("#action_button").text("Actualizar");

  $("#action_modal").modal("show");

  $.ajax({
    url: "http://localhost:4000/clients/search/" + id,
    method: "GET",
    dataType: "JSON",
    success: function (data) {
      console.log(data);
      $("#idCliente").val(data.IdCliente);
      $("#dniSearch").val(data.Dni);
      $("#nombresSearch").val(data.Nombres);
      $("#apellidosSearch").val(data.Apellidos);
      $("#telefonoSearch").val(data.Telefono);

    },
  });
}

if (document.querySelector("#form")) {
  let frmRegistro = document.querySelector("#form");

  frmRegistro.onsubmit = function (event) {
    event.preventDefault();
    let dni = $("#dni");
    let nombres = $("#nombres");
    let apellidos = $("#apellidos");
    let telefono = $("#telefono");
    guardar(dni, nombres, apellidos, telefono);
  };

  async function guardar(dni, nombres, apellidos, telefono) {
    try {
      const dat = {
        dni: dni.val(),
        nombres: nombres.val(),
        apellidos: apellidos.val(),
        telefono: telefono.val(),
      };
      console.log(dat);

      $.ajax({
        url: "/clients/create",
        method: "POST",
        data: {
          dni: dni.val(),
          nombres: nombres.val(),
          apellidos: apellidos.val(),
          telefono: telefono.val(),
        },
        success: function (res) {

          if (res.messageError) {
            $("#message").html(
              '<div class="alert alert-warning  alert-dismissible fade show">' +
                res.messageError +
                ' <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </div>'
            );
            setTimeout(function () {
              $("#message").html("");
            }, 5000);

          } else {
            $("#message").html(
              '<div class="alert alert-success  alert-dismissible fade show">' +
                res.message +
                ' <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </div>'
            );
            setTimeout(function () {
              $("#message").html("");
            }, 5000);

            createTable();

            dni.val("");
            nombres.val("");
            apellidos.val("");
            telefono.val("");
          }
        
        },
      });
    } catch (e) {
      console.log(e);
    }
  }
}



function actualizar (){
  let frmRegistro = document.querySelector("#sample_form");

  frmRegistro.onsubmit = function (event) {
    event.preventDefault();
    let id = $("#idCliente");
    let dni = $("#dniSearch");
    let nombres = $("#nombresSearch");
    let apellidos = $("#apellidosSearch");
    let telefono = $("#telefonoSearch");
    guardar(id, dni, nombres, apellidos, telefono);
  };

  async function guardar(id, dni, nombres, apellidos, telefono) {
    try {
     
      const dat = {
        id: id.val(),
        dni: dni.val(),
        nombres: nombres.val(),
        apellidos: apellidos.val(),
        telefono: telefono.val(),
      };


      $.ajax({
        url: "/clients/update/" +parseInt(dat.id),
        method: "PUT",
        data: {
          dni: dni.val(),
          nombres: nombres.val(),
          apellidos: apellidos.val(),
          telefono: telefono.val(),
        },
        success: function (res) {
          $('#action_modal').modal('hide');
          $("#message").html(
            '<div class="alert alert-success  alert-dismissible fade show">' +
              res.message +
              ' <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </div>'
          );
          createTable();

          dni.val("");
          nombres.val("");
          apellidos.val("");
          telefono.val("");

          setTimeout(function () {
            $("#message").html("");
          }, 5000);
        },
      });
    } catch (e) {
      console.log(e);
    }
  }
}
