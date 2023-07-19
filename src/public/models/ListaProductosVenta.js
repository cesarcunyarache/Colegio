let listaProductosVenta = [];

export const AgregarProducto = (DetalleVenta) => {
  let obj = existeProducto(DetalleVenta);
  if (obj == null) {
    listaProductosVenta.push(DetalleVenta);
  } else {
    actualizarProducto(DetalleVenta);
  }
};

function actualizarProducto(DetalleVenta) {
  for (let value of listaProductosVenta) {
    if (
      value.IdProducto == DetalleVenta.IdProducto &&
      value.IdTalla == DetalleVenta.IdTalla
    ) {
      value.Cantidad += DetalleVenta.Cantidad;
      value.Importe = value.Precio * value.Cantidad;
    }
  }
}

function existeProducto(DetalleVenta) {
  for (let value of listaProductosVenta) {
    if (
      value.IdProducto == DetalleVenta.IdProducto &&
      value.IdTalla == DetalleVenta.IdTalla
    ) {
      return value;
    }
  }
  return null;
}


export const getTotal = () => {
  let total = 0;
  for (let value of listaProductosVenta) {
      total += value.Importe;
    }

  return total;
}

export const EliminarProducto = (IdProducto, IdTalla) => {
    let valor = null;
    const index = listaProductosVenta.findIndex(
      (objeto) => objeto.IdTalla == IdTalla &&   objeto.IdProducto == IdProducto
    );
    if (index !== -1) {
      valor = listaProductosVenta[index];
      listaProductosVenta.splice(index, 1);
    }
    return valor;
}
export const getListaProductosVenta = () => {
  return listaProductosVenta;
};

export const setListaProductoVenta = (listaProducto) => {
  listaProductosVenta = listaProducto;
};
