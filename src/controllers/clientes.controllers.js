import { getConnection, sql } from "../database/connection.js";

export const Create = async (req, res) => {
    const { dni, nombres, apellidos, telefono } = req.body;
    try {
      const pool = await getConnection();
  

      const existe =  await pool
      .request()
      .input("Dni", sql.VarChar, dni)
      .query("SELECT * FROM Cliente  WHERE Dni = @Dni");

      
      if (existe.recordset.length == 0 ){
  
      const result = await pool
        .request()
        .input("Dni", sql.VarChar, dni)
        .input("Nombres", sql.VarChar, nombres)
        .input("Apellidos", sql.VarChar, apellidos)
        .input("Telefono", sql.VarChar, telefono)
        .query("INSERT INTO Cliente VALUES (@Dni, @Nombres, @Apellidos, @Telefono)");

        if(result.rowsAffected[0] > 0){
           res.json({
            message: "Agregado correctamente"
           })
        } else {
          console.log("error");
        }
      } else {
        res.json({
          messageError: "El DNI ya está registrado"
         })
      }

    } catch (error) {
      res.status(500);
      res.render(error.message);
    }
  };

  export const Read = async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool.request().query("SELECT * FROM Cliente");
      
      
      /* res.render('customers', {
        data: result.recordset

    }) */
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.render(error.message);
    }
  };



  export const Update = async (req, res) => {
    try {
      const { id } = req.params;
      const { dni, nombres, apellidos, telefono } = req.body;
      const pool = await getConnection();
  
      const result = await pool
        .request()
        .input("Dni", sql.VarChar, dni)
        .input("Nombres", sql.VarChar, nombres)
        .input("Apellidos", sql.VarChar, apellidos)
        .input("Telefono", sql.VarChar, telefono)
        .input("IdCliente", sql.Int, id)
        .query("UPDATE Cliente SET Dni=@Dni, Nombres=@Nombres, Apellidos=@Apellidos, Telefono=@Telefono WHERE IdCliente=@IdCliente");

        if (result.rowsAffected[0] > 0) { 
          res.json({
            message: "Actualizado correctamente"
           })
        }
     
    } catch (error) {
       res.send(error.message);
    }
  };



  export const Search = async (req, res) => {
    try {
      const { id } = req.params;
      const pool = await getConnection();
      const result = await pool
        .request()
        .input("IdCliente",sql.VarChar, id)
        .query("SELECT * FROM Cliente WHERE IdCliente = @IdCliente");

        if (result.recordset.length > 0) {
          res.json(result.recordset[0]);
        } else {
          res.json({ message: "dato no encontrado"});
        }
      
        
    } catch (error) {
      res.send(error.message);
    }
  };



  export const SearchDNI = async (req, res) => {
    try {
      const {id } = req.params;
      const pool = await getConnection();
      const result = await pool
        .request()
        .input("Dni", id)
        .query("SELECT * FROM Cliente WHERE Dni = @Dni");

        if (result.recordset.length > 0) {
          res.json(result.recordset[0]);
        } else {
          res.json({ message: "dato no encontrado"});
        }
      
        
    } catch (error) {
      res.send(error.message);
    }
  };