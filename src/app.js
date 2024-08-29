import express from "express";
import morgan from "morgan";
import productsRoute from "./routers/Products.routes.js";
import estadosRoute from './routers/Estados.routes.js';
import categoriaProductosRoute from './routers/CategoriaProductos.routes.js';
import authRoute from './routers/auth.route.js';
import UsuariosRoute from "./routers/Usuarios.route.js";
import OrdenDetalleRoute from "./routers/DetallesOrden.route.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use(productsRoute);
app.use(estadosRoute);
app.use(categoriaProductosRoute);
app.use(authRoute);
app.use(UsuariosRoute);
app.use(OrdenDetalleRoute);



export default app;