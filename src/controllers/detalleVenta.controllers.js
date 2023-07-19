import { getConnection, sql } from "../database/connection.js";


export const Create = async (req, res) => {
  const { IdVenta, IdProducto, IdTalla, Cantidad, Importe} = req.body;
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("IdVenta", sql.Int, IdVenta)
      .input("IdProducto", sql.Int, IdProducto)
      .input("IdTalla", sql.Int, IdTalla)
      .input("Cantidad", sql.Int, Cantidad)
      .input("Importe", sql.Decimal, Importe)
      .query("INSERT INTO DetalleVenta VALUES (@IdVenta, @IdProducto, @IdTalla, @Cantidad, @Importe)");
 
      if (result.rowsAffected[0] > 0){
         res.json({message: "Se registro correctamente"})
      }
  } catch (error) {
    res.status(500);
    res.render(error.message);
  }
};
