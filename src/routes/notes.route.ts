import Express from "express"; // se declara la instacia de express
import { test } from "../controllers/notes.controllers"; // se importan los controladores

const router = Express.Router(); // se declara el router para las rutas y peticiones

router.get("/test", test); // se declara la primera peticion de prueba

export default router; // se esporta el router para que pueda ser usado en otros archivos
