import { Router } from "express";
import { Create, Read, Update, SearchId, ReadCategoria, ReadGenero, ReadCategoriaGenero } from "../controllers/productos.controllers.js";
import { authRequerid } from "../middlewares/validateToken.js"
const router = Router();

router.get('/productos',  authRequerid, (req, res) => {
    res.render('productos', {title : 'Node JS Ajax CRUD Application'})
});


router.post('/productos/create/', Create);
router.get('/productos/read/', Read);
router.get('/productos/readCategoria/:id', ReadCategoria);
router.get('/productos/readGenero/:id', ReadGenero);
router.post('/productos/readCategoriaGenero', ReadCategoriaGenero);
router.get('/productos/search/:id', SearchId);
router.put('/productos/update/', Update);

export default router;