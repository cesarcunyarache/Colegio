export class Producto {
    constructor(idProducto, nombre, descripcion, genero, idCategoria) {
      this._idProducto = idProducto;
      this._nombre = nombre;
      this._descripcion = descripcion;
      this._genero = genero;
      this._idCategoria = idCategoria;
    }
  
    get idProducto() {
      return this._idProducto;
    }
    set idProducto(value) {
      this._idProducto = value;
    }
  
    get nombre() {
      return this._nombre;
    }
    set nombre(value) {
      this._nombre = value;
    }
  
  
    get descripcion() {
      return this._descripcion;
    }
    set descripcion(value) {
      this._descripcion = value;
    }
  
    
    get genero() {
      return this._genero;
    }
    set genero(value) {
      this._genero = value;
    }
  
    get idCategoria() {
      return this._idCategoria;
    }
    set idCategoria(value) {
      this._idCategoria = value;
    }
  }
  
  