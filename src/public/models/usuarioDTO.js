export class Usuario {
    constructor(idUsuario, nombresApellidos, usuario, contrasena, correo) {
      this._idUsuario = idUsuario;
      this._nombresApellidos = nombresApellidos;
      this._usuario = usuario;
      this._contrasena = contrasena;
      this._correo = correo;
    }
  

    get idUsuario() {
      return this._idUsuario;
    }
  
    set idUsuario(value) {
      this._idUsuario = value;
    }
  

    get nombresApellidos() {
      return this._nombresApellidos;
    }
  
    set nombresApellidos(value) {
      this._nombresApellidos = value;
    }
  

    get usuario() {
      return this._usuario;
    }
  
    set usuario(value) {
      this._usuario = value;
    }
  

    get contrasena() {
      return this._contrasena;
    }
  
    set contrasena(value) {
      this._contrasena = value;
    }
  

    get correo() {
      return this._correo;
    }
  
    set correo(value) {
      this._correo = value;
    }
  }
 