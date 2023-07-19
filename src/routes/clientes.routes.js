import { Router } from "express";
import { Read, Create, Update, Search, SearchDNI} from "../controllers/clientes.controllers.js";
import { authRequerid } from "../middlewares/validateToken.js"
const router = Router();

router.get('/clientes',  authRequerid,  (req, res) => {
    res.render('clientes', {title : 'Node JS Ajax CRUD Application'});
})
router.get('/clients/read', Read);
router.put('/clients/update/:id', Update)
router.post('/clients/create', Create)
router.get('/clients/search/:id', Search)
router.get('/clientes/searchDNI/:id', SearchDNI)


export default router;