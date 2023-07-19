export const mensaje = (mensaje, tipo) => {
    try {
      $("#message").html(
        '<div class="alert alert-'+ tipo +' alert-dismissible fade show">' +
          mensaje +
          ' <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </div>'
      );
      setTimeout(function () {
        $("#message").html("");
      }, 3000);
    } catch (ex) {
      console.error(ex);
    }
  };
  