export class Venta {
  constructor(idCliente, fecha, total, idUsuario) {
    this._idVenta = null;
    this._idCliente = idCliente;
    this._fecha = fecha;
    this._total = total;
    this._idUsuario = idUsuario;
  }


  get idVenta() {
    return this._idVenta;
  }

  set idVenta(value) {
    this._idVenta = value;
  }


  get idCliente() {
    return this._idCliente;
  }

  set idCliente(value) {
    this._idCliente = value;
  }


  get fecha() {
    return this._fecha;
  }

  set fecha(value) {
    this._fecha = value;
  }


  get total() {
    return this._total;
  }

  set total(value) {
    this._total = value;
  }


  get idUsuario() {
    return this._idUsuario;
  }

  set idUsuario(value) {
    this._idUsuario = value;
  }
}
