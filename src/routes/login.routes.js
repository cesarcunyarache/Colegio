import { Router } from "express";
import { Login, Register, Profile, Logout } from "../controllers/login.controllers.js";
import { authRequerid } from "../middlewares/validateToken.js"
const router = Router();

router.get('/login',  (req, res) => {
    res.render('login', {title : 'Node JS Ajax CRUD Application'});
})

router.post('/register', Register)
router.post('/login', Login);
router.post('/logout', Logout);
router.get('/profile', authRequerid, Profile)





export default router;