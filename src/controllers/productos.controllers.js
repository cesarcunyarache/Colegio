import { getConnection, sql } from "../database/connection.js";


export const Create = async (req, res) => {
    const { Nombre, Descripcion, Genero, IdCategoria } = req.body;

    console.log(req.body);
    try {
      const pool = await getConnection();
  
      const result = await pool
        .request()
        .input("Nombre", sql.VarChar, Nombre)
        .input("Descripcion", sql.VarChar, Descripcion)
        .input("Genero", sql.VarChar, Genero)
        .input("IdCategoria", sql.Int, IdCategoria)
        .query("INSERT INTO Productos OUTPUT inserted.IdProducto VALUES (@Nombre, @Descripcion, @Genero, @IdCategoria)");
   
        console.log(result);
        if (result.recordset[0].IdProducto){
                res.send(result.recordset[0].IdProducto.toString());
        } else {
           console.log("error al insertar")
        }
    } catch (error) {
      res.status(500);
      res.render(error.message);
    }
  };


export const Read = async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool.request().query("SELECT * FROM Productos");

      if (result.recordset.length > 0){
           res.json(result.recordset);
      }
      
      
    } catch (error) {
      res.status(500);
      res.render(error.message);
    }
  };


  export const ReadCategoria = async (req, res) => {
    try {
      const {id} = req.params

      const pool = await getConnection();
      const result = await pool.request()
      .input("IdCategoria", sql.Int, id)
      .query("SELECT * FROM Productos WHERE IdCategoria = @IdCategoria");


           res.json(result.recordset);
      
  
    } catch (error) {
      res.status(500);
      res.render(error.message);
    }
  };


  export const ReadGenero = async (req, res) => {
    try {
      const {id} = req.params

      const pool = await getConnection();
      const result = await pool.request()
      .input("Genero", sql.VarChar, id)
      .query("SELECT * FROM Productos WHERE genero = @Genero");
           res.json(result.recordset);
      
  
    } catch (error) {
      res.status(500);
      res.render(error.message);
    }
  };



  export const ReadCategoriaGenero = async (req, res) => {
    try {
      const {IdCategoria, Genero} = req.body

      const pool = await getConnection();
      const result = await pool.request()
      .input("IdCategoria", sql.Int, IdCategoria)
      .input("Genero", sql.VarChar, Genero)
      .query("SELECT * FROM Productos WHERE IdCategoria = @IdCategoria AND genero = @Genero");
      res.json(result.recordset);
      
  
    } catch (error) {
      res.status(500);
      res.render(error.message);
    }
  };



  export const Update = async (req, res) => {
    try {

      const { IdProducto,  Nombre, Descripcion, Genero, IdCategoria } = req.body;
       console.log({ IdProducto,  Nombre, Descripcion, Genero, IdCategoria } )
      const pool = await getConnection();
  
      const result = await pool.request()
      .input("Nombre", sql.VarChar, Nombre)
      .input("Descripcion", sql.VarChar, Descripcion)
      .input("Genero", sql.VarChar, Genero)
      .input("IdCategoria", sql.Int, IdCategoria)
      .input("IdProducto", sql.Int, IdProducto)
      .query("UPDATE Productos SET Nombre=@Nombre,Descripcion=@Descripcion,Genero=@Genero,IdCategoria=@IdCategoria WHERE IdProducto=@IdProducto");
 

        res.json({message: "Se actualizo correctamente"})
      
    } catch (error) {
       console.log(error);
    }
  };


  export const SearchId = async (req, res) => {
    try {
      const { id } = req.params;
      const pool = await getConnection();
      const result = await pool
        .request()
        .input("IdProducto", sql.Int, id)
        .query("SELECT * FROM Productos WHERE IdProducto = @IdProducto");
        if (result.recordset.length > 0) {
          res.json(result.recordset[0]);
        }
        
    } catch (error) {
      res.send(error.message);
    }
  };

