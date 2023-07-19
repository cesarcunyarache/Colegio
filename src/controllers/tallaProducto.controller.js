import { getConnection, sql } from "../database/connection.js";


export const Create = async (req, res) => {
  const { IdProducto, IdTalla, Precio, Stock} = req.body;
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("IdProducto", sql.Int, IdProducto)
      .input("IdTalla", sql.Int, IdTalla)
      .input("Precio", sql.Decimal, Precio)
      .input("Stock", sql.Int, Stock)
      .query("INSERT INTO TallaProducto VALUES (@IdProducto, @IdTalla, @Precio, @Stock)");
 
      if (result.rowsAffected[0] > 0){
         res.json({message: "Se registro correctamente"})
      }
  } catch (error) {
    res.status(500);
    res.render(error.message);
  }
};


export const Read = async (req, res) => {
    try {

     const {id} = req.params;
      const pool = await getConnection();
      const result = await pool
      .request()
      .input("IdProducto", sql.Int, id)
      .query("select * FROM TallaProducto tp inner join Tallas t on tp.IdTalla = t.IdTalla WHERE IdProducto = @IdProducto");
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.render(error.message);
    }
  };


  export const ReadStock = async (req, res) => {
    try {

     const {id} = req.params;
      const pool = await getConnection();
      const result = await pool
      .request()
      .input("IdProducto", sql.Int, id)
      .query("select * FROM TallaProducto tp inner join Tallas t on tp.IdTalla = t.IdTalla WHERE IdProducto = @IdProducto AND Stock > 0 ");
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.render(error.message);
    }
  };



  export const ReadAll = async (req, res) => {
    try {

      const pool = await getConnection();
      const result = await pool
      .request()
      .query("select * FROM TallaProducto");
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.render(error.message);
    }
  };

export const Update = async (req, res) => {
    try {

      const { Id, IdProducto, IdTalla, Precio, Stock } = req.body;
      const pool = await getConnection();
  
      const result = await pool.request()
      .input("IdProducto", sql.Int, IdProducto)
      .input("IdTalla", sql.Int, IdTalla)
      .input("Precio", sql.Decimal, Precio)
      .input("Stock", sql.Int, Stock)
      .input("Id", sql.Int, Id)
      .query("UPDATE TallaProducto SET IdProducto = @IdProducto, IdTalla =@IdTalla, Precio = @Precio, Stock = @Stock  WHERE Id = @Id");
       
      if (result.rowsAffected[0] > 0) {
        res.json({ message: "Se actualizo correctamente" });
      } else {
        res.json({ messageError: "Error al actualizar registro" });
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
        .input("Id", id)
        .query("SELECT * FROM TallaProducto WHERE Id = @Id");
        if (result.recordset.length > 0) {
          res.json(result.recordset[0]);
        }
        
    } catch (error) {
      res.send(error.message);
    }
  };



