import { getConnection, sql } from "../database/connection.js";


export const Read = async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool.request().query("SELECT * FROM Categoria");
      
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.render(error.message);
    }
  };
