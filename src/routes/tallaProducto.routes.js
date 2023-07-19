import { Router } from "express";
import {Create, Read, Search, Update, ReadAll, ReadStock} from "../controllers/tallaProducto.controller.js";


const router = Router();

router.post('/tallaProducto/create', Create)
router.get('/tallaProducto/read/:id', Read)
router.get('/tallaProducto/readStock/:id', ReadStock)
router.get('/tallaProducto/read/', ReadAll)
router.get('/tallaProducto/search/:id', Search);
router.put('/tallaProducto/update', Update)
export default router;