import express from "express"; // se importa express
import cors from "cors"; // se importa cors para que no haya problemas de comunicacion entre otras plataformas
import noteRoutes from "./routes/notes.route";
import userRoutes from "./routes/users.route";
import database from "./configs/mongo";

import passport from "passport";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const secret: string = process.env.SECRET;

const server = express(); // se crea la instacia de express
const port = 3000; // se declara el puerto por ahora

server.use(cors()); // se usa cors
server.use(express.json()); // se usa el middleware para que express pueda entender json
server.use(express.urlencoded({ extended: true })); // se usa el middleware para que express pueda entender los datos de un formulario
server.use(passport.initialize()); // se inicializa passport
server.use(passport.session()); // se usa el middleware para que express pueda usar sesiones de passport

server.use("/notes", noteRoutes); // se declaran las rutas para las notas
server.use(
  "/users",

  userRoutes
); // se declaran las rutas para los usuarios

try {
  database.on("error", (err) => {
    console.error("Error de conexion a la base de datos:", err);
  });

  database.once("open", async () => {
    console.log("Conexion a la base de datos exitosa");
  });
} catch (error) {
  console.log(error);
}

server.listen(port || 3000, "0.0.0.0", () =>
  console.log(`Server is running on port ${port}`)
); // se levanta el servidor
