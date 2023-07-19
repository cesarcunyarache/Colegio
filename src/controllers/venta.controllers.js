import { getConnection, sql } from "../database/connection.js";

export const Create = async (req, res) => {
    const { IdCliente, Total, IdUsuario } = req.body;

    console.log(req.body);
    try {
      const pool = await getConnection();
  
      const result = await pool
        .request()
        .input("IdCliente", sql.Int, IdCliente)
        .input("Total", sql.Decimal, Total)
        .input("IdUsuario", sql.Int, IdUsuario)
        .query("INSERT INTO Ventas OUTPUT inserted.IdVenta VALUES (@IdCliente, GETDATE(), @Total, @IdUsuario)");

        if (result.recordset[0].IdVenta){
           res.send(result.recordset[0].IdVenta.toString());
        } else {
           console.log("error al insertar")
        }
    } catch (error) {
      res.status(500);
      res.render(error.message);
    }
  };