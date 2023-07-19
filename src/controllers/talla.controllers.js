import { getConnection, sql } from "../database/connection.js";


export const Read = async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool.request().query("SELECT * FROM Tallas");
      if (result.recordset.length > 0) {
        res.json(result.recordset);
      } 
    } catch (error) {
      res.status(500);
      res.render(error.message);
    }
  };