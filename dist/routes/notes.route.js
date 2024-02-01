"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // se declara la instacia de express
const notes_controllers_1 = require("../controllers/notes.controllers"); // se importan los controladores
const router = express_1.default.Router(); // se declara el router para las rutas y peticiones
router.get("/test", notes_controllers_1.test); // se declara la primera peticion de prueba
exports.default = router; // se esporta el router para que pueda ser usado en otros archivos
