let listaTallasProducto = [];
let listaTallasProductoActualizar = [];

export const agregarTallas = (talla) => {
  let agregado = false;
  if (listaTallasProducto.length !== 0) {
    let indice = buscarTalla(talla.IdTalla);
    if (indice == null) {
      listaTallasProducto.push(talla);
      agregado = true;
    }
  } else {
    listaTallasProducto.push(talla);
    agregado = true;
  }
  return agregado;
};

export const agregarActualizacion = (talla) => {
  let agregado = false;
  let indice = buscarTalla(talla.IdTalla);
  let index = buscarTallaActual(talla.IdTalla);
  if (listaTallasProductoActualizar.length !== 0) {
    if (indice == null && index == null) {
      listaTallasProductoActualizar.push(talla);
      agregado = true;
    }
  } else if (indice == null && index == null) {
    listaTallasProductoActualizar.push(talla);
    agregado = true;
  }

  return agregado;
};

export function actualizarTallaLista(talla) {
  for (let key in listaTallasProducto) {
    if (listaTallasProducto[key].IdTalla == talla.IdTalla) {
      listaTallasProducto[key] = talla;
      return true;
    }
  }

  for (let key in listaTallasProductoActualizar) {
    if (listaTallasProductoActualizar[key].IdTalla == talla.IdTalla) {
      listaTallasProductoActualizar[key] = talla;
      return true;
    }
  }

  return false;
}

export const eliminarTalla = (IdTalla) => {
  let valor = null;
  const index = listaTallasProducto.findIndex(
    (objeto) => objeto.IdTalla == IdTalla
  );
  if (index !== -1) {
    valor = listaTallasProducto[index];
    listaTallasProducto.splice(index, 1);
  }
  return valor;
};

export const eliminarTallaActualizar = (IdTalla) => {
  let valor = null;
  const index = listaTallasProductoActualizar.findIndex(
    (objeto) => objeto.IdTalla == IdTalla
  );
  if (index !== -1) {
    valor = listaTallasProductoActualizar[index];
    listaTallasProductoActualizar.splice(index, 1);
  }
  return valor;
};

function buscarTalla(IdTalla) {
  for (let key in listaTallasProducto) {
    if (listaTallasProducto[key].IdTalla == IdTalla) {
      return key;
    }
  }
  return null;
}

function buscarTallaActual(IdTalla) {
  for (let key in listaTallasProductoActualizar) {
    if (listaTallasProductoActualizar[key].IdTalla == IdTalla) {
      return key;
    }
  }
  return null;
}


export function buscarTallaId (idTalla){
  for (let key in listaTallasProducto) {
    if (listaTallasProducto[key].IdTalla == idTalla) {
       return listaTallasProducto[key];
    }
  }

  for (let key in listaTallasProductoActualizar) {
    if (listaTallasProductoActualizar[key].IdTalla == idTalla) {
       return listaTallasProductoActualizar[key];
    }
  }

  return null;
}

export function getListaTallaProducto() {
  return listaTallasProducto;
}

export function getListaTallasProductoActualizar() {
  return listaTallasProductoActualizar;
}

export function getListaConcat() {
  return listaTallasProducto.concat(listaTallasProductoActualizar);
}

export function setListaTallaProducto(listaTallasProductoTwo) {
  listaTallasProducto = listaTallasProductoTwo;
}

export function setListaTallaProductoActualizar(
  listaTallasProductoActualizarTwo
  ) {
  listaTallasProductoActualizar = listaTallasProductoActualizarTwo;
}
