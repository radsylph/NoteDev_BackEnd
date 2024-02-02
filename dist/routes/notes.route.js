"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notes_controllers_1 = require("../controllers/notes.controllers");
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
router.get("/test", notes_controllers_1.test);
router.post("/create", passport_1.default.authenticate("jwt", { session: false }), notes_controllers_1.createNote);
router.put("/edit/:note_id", passport_1.default.authenticate("jwt", { session: false }), notes_controllers_1.editNote);
router.delete("/delete/:note_id", passport_1.default.authenticate("jwt", { session: false }), notes_controllers_1.deleteNote);
exports.default = router;
