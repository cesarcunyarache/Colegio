export class TallaProducto {
    constructor(Id, IdProducto, IdTalla, Precio, Stock) {
      this._Id = Id;
      this._IdProducto = IdProducto;
      this._IdTalla = IdTalla;
      this._Precio = Precio;
      this._Stock = Stock;
    }
  
  
    get Id() {
      return this._Id;
    }
  
    get IdProducto() {
      return this._IdProducto;
    }
  
    get IdTalla() {
      return this._IdTalla;
    }
  
    get Precio() {
      return this._Precio;
    }
  
    get Stock() {
      return this._Stock;
    }
  
    
    set Id(value) {
      this._Id = value;
    }
  
    set IdProducto(value) {
      this._IdProducto = value;
    }
  
    set IdTalla(value) {
      this._IdTalla = value;
    }
  
    set Precio(value) {
      this._Precio = value;
    }
  
    set Stock(value) {
      this._Stock = value;
    }
  }
  