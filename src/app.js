import express from "express";
import config  from './config.js'
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from 'url';
import cookieParser from "cookie-parser";

import clientsRoutes from './routes/clientes.routes.js';
import productosRoutes from './routes/productos.routes.js';
import tallaRoutes from './routes/tallas.routes.js';
import tallaProductoRoutes from './routes/tallaProducto.routes.js';
import categoriaRoutes from './routes/categoria.routes.js';
import ventasRoutes from './routes/ventas.routes.js';
import detalleVentaRoutes from './routes/detalleVenta.routes.js';
import loginRoutes from './routes/login.routes.js';

const app = express();

// setings
app.set('port', config.port);
app.set('view engine', 'ejs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('views', path.join(__dirname, 'views'));


// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended : false}));

app.use(express.static('views'));
app.use(express.static(path.join(__dirname, 'public')));



app.use(clientsRoutes);
app.use(productosRoutes);
app.use(tallaRoutes);
app.use(tallaProductoRoutes);
app.use(categoriaRoutes);
app.use(ventasRoutes);
app.use(detalleVentaRoutes)
app.use(loginRoutes);



app.use(function(req, res, next) {
    res.status(404).render('404');
  });


export default app