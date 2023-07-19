export class Cliente {
    constructor(idCliente, dni, nombres, apellidos, telefono) {
      this._idCliente = idCliente;
      this._dni = dni;
      this._nombres = nombres;
      this._apellidos = apellidos;
      this._telefono = telefono;
    }
  

    get idCliente() {
      return this._idCliente;
    }
  
    set idCliente(value) {
      this._idCliente = value;
    }
  

    get dni() {
      return this._dni;
    }
  
    set dni(value) {
      this._dni = value;
    }
  

    get Nombres() {
      return this._nombres;
    }
  
    set Nombres(value) {
      this._nombres = value;
    }
  

    get Apellidos() {
      return this._apellidos;
    }
  
    set Apellidos(value) {
      this._apellidos = value;
    }
  

    get telefono() {
      return this._telefono;
    }
  
    set telefono(value) {
      this._telefono = value;
    }
  }
