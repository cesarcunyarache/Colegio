import { Router } from "express";
import { Read} from "../controllers/categoria.controllers.js";
const router = Router();

router.get('/categoria/read', Read);



export default router;