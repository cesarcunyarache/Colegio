export class Talla {
    constructor(idTalla, talla) {
      this._idTalla = idTalla;
      this._talla = talla;
    }
  
 
    get idTalla() {
      return this._idTalla;
    }
  
    set idTalla(value) {
      this._idTalla = value;
    }
  

    get talla() {
      return this._talla;
    }
  
    set talla(value) {
      this._talla = value;
    }
  }
  
 