export class DetalleVenta {
    constructor(idVenta, idProducto, idTalla, Precio, Cantidad) {
      this._idVenta = idVenta;
      this._idProducto = idProducto;
      this._idTalla = idTalla;
      this._precio = Precio;
      this._cantidad = Cantidad;
      this._importe = Cantidad * Precio;
    }
  
    // Getter y Setter para IdVenta
    get IdVenta() {
      return this._idVenta;
    }
  
    set IdVenta(value) {
      this._idVenta = value;
    }


    get Precio (){
      return this._precio;
    }

    set Precio(value) {
      this._precio = value;
    }
  
    // Getter y Setter para IdProducto
    get IdProducto() {
      return this._idProducto;
    }
  
    set IdProducto(value) {
      this._idProducto = value;
    }
  
    // Getter y Setter para IdTalla
    get IdTalla() {
      return this._idTalla;
    }
  
    set IdTalla(value) {
      this._idTalla = value;
    }
  
    // Getter y Setter para Cantidad
    get Cantidad() {
      return this._cantidad;
    }
  
    set Cantidad(value) {
      this._cantidad = value;
    }
  
    // Getter y Setter para Importe
    get Importe() {
      return this._importe;
    }
  
    set Importe(value) {
      this._importe = value;
    }
  }
  
