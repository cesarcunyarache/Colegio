import { Router } from "express";
import { Create} from "../controllers/detalleVenta.controllers.js";
const router = Router();


router.post('/detalleVenta/create', Create);


export default router;