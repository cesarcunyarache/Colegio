import { getConnection, sql } from "../database/connection.js";
import bcrypt from "bcrypt";
import { createAccesToken } from "../libs/jwt.js";

export const Register = async (req, res) => {
  const { NombresApellidos, Usuario, Contrasena, Correo } = req.body;
  try {
    console.log(req.body);
    const pool = await getConnection();

    const ContrasenaHash = await bcrypt.hash(Contrasena, 10);
     console.log(ContrasenaHash);
    const result = await pool
      .request()
      .input("NombresApellidos", sql.VarChar, NombresApellidos)
      .input("Usuario", sql.VarChar, Usuario)
      .input("Contrasena", sql.VarChar, ContrasenaHash)
      .input("Correo", sql.VarChar, Correo)
      .query(
        "INSERT INTO Usuario VALUES (@NombresApellidos, @Usuario, @Contrasena, @Correo)"
      );

    if (result.rowsAffected[0] > 0) {
      res.json({ message: "Se registro correctamente" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req, res) => {
  const { Usuario, Contrasena } = req.body;
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("Usuario", sql.VarChar, Usuario)
      .input("Contrasena", sql.VarChar, Contrasena)
      .query("SELECT * FROM Usuario Where Usuario = @Usuario");

    if (result.recordset.length > 0) {
      let password = result.recordset[0].Contrasena;
      const isMatch = await bcrypt.compare(Contrasena, password);
      if (isMatch) {
        const token = await createAccesToken({ id: result.recordset[0].IdUsuario });
        res.cookie("token", token);
        res.json({message: "Login"})

      } else {
        res.json({ messageError: "Contraseña incorrecta" });
      }
    } else {
      res.json({ messageError: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500);
    res.render(error.message);
  }
};


export const Logout = (req, res) => {
    res.clearCookie("token", "", { expires: new Date(0) });
    return res.sendStatus(200);
  };


  export const Profile = async (req, res) => {
    try {
      const id = req.user.id;

      const pool = await getConnection();

    const result = await pool
      .request()
      .input("IdUsuario", sql.Int, id)
      .query("SELECT * FROM Usuario Where IdUsuario = @IdUsuario");

    if (result.recordset.length > 0) {
        res.json(result.recordset);
    }

    } catch (err) {
      console.log(err);
  }
  };
  


  
