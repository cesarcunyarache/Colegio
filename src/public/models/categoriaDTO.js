export class Categoria {
    constructor(idCategoria, nombre) {
      this._idCategoria = idCategoria;
      this._nombre = nombre;
    }
  
    get idCategoria() {
      return this._idCategoria;
    }
  
    set idCategoria(value) {
      this._idCategoria = value;
    }
  
    get nombre() {
      return this._nombre;
    }
  
    set nombre(value) {
      this._nombre = value;
    }
  }
  