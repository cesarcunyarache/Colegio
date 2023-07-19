import { Router } from "express";
import { Create} from "../controllers/venta.controllers.js";
import { authRequerid } from "../middlewares/validateToken.js"
const router = Router();

router.get('/ventas', authRequerid, (req, res) => {
    res.render('ventas', {title : 'Node JS Ajax CRUD Application'});
})

router.post('/ventas/create', Create);


export default router;