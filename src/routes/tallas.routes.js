import { Router } from "express";
import { Read} from "../controllers/talla.controllers.js";
const router = Router();


router.get('/tallas/read', Read);


export default router;