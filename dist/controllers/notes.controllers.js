"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setFavorite = exports.getCategories = exports.getNotes = exports.createCategory = exports.deleteNote = exports.editNote = exports.createNote = exports.test = void 0;
const note_1 = __importDefault(require("../models/note"));
const category_1 = __importDefault(require("../models/category"));
const jwt_1 = require("../utils/jwt");
const user_1 = __importDefault(require("../models/user"));
const test = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield res.send("funciona");
});
exports.test = test;
const createNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { title, description, priority, favorite, category } = req.body;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    const payload = (0, jwt_1.decryptToken)(token);
    try {
        const searchUser = yield user_1.default.findById(payload.user._id);
        if (!searchUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const newNote = yield note_1.default.create({
            owner_id: payload.user._id,
            title,
            description,
            priority,
            favorite,
            category,
        });
        return res.status(200).json({ message: "Note created", note: newNote });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
});
exports.createNote = createNote;
const editNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { title, description, priority, favorite, category_id } = req.body;
    const { note_id } = req.params;
    const token = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1];
    const payload = (0, jwt_1.decryptToken)(token);
    try {
        const searchNote = yield note_1.default.findById(note_id);
        if (!searchNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        if (searchNote.owner_id !== payload.user._id) {
            return res.status(401).json({ message: "You can't edit this note" });
        }
        yield note_1.default.findByIdAndUpdate(note_id, {
            title,
            description,
            priority,
            favorite,
            category_id,
        });
        return res.status(200).json({ message: "Note updated" });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
});
exports.editNote = editNote;
const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const { note_id } = req.params;
    const token = (_c = req.headers.authorization) === null || _c === void 0 ? void 0 : _c.split(" ")[1];
    const payload = (0, jwt_1.decryptToken)(token);
    try {
        const searchNote = yield note_1.default.findById(note_id);
        if (!searchNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        if (searchNote.owner_id !== payload.user._id) {
            return res.status(401).json({ message: "You can't delete this note" });
        }
        yield note_1.default.findByIdAndDelete(note_id);
        return res.status(200).json({ message: "Note deleted" });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
});
exports.deleteNote = deleteNote;
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const { name } = req.body;
    const token = (_d = req.headers.authorization) === null || _d === void 0 ? void 0 : _d.split(" ")[1];
    const payload = (0, jwt_1.decryptToken)(token);
    try {
        const searchUser = yield user_1.default.findById(payload.user._id);
        if (!searchUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const newCategory = yield category_1.default.create({
            owner_id: payload.user._id,
            name,
        });
        return res
            .status(200)
            .json({ message: "Category created", category: newCategory });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
});
exports.createCategory = createCategory;
const getNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const token = (_e = req.headers.authorization) === null || _e === void 0 ? void 0 : _e.split(" ")[1];
    const payload = (0, jwt_1.decryptToken)(token);
    try {
        const notes = yield note_1.default.find({ owner_id: payload.user._id }).exec();
        return res.status(200).json({ notes });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
});
exports.getNotes = getNotes;
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    const token = (_f = req.headers.authorization) === null || _f === void 0 ? void 0 : _f.split(" ")[1];
    const payload = (0, jwt_1.decryptToken)(token);
    try {
        const categories = yield category_1.default.find({ owner_id: payload.user._id });
        return res.status(200).json({ categories });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
});
exports.getCategories = getCategories;
const setFavorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    const { note_id } = req.params;
    const token = (_g = req.headers.authorization) === null || _g === void 0 ? void 0 : _g.split(" ")[1];
    const payload = (0, jwt_1.decryptToken)(token);
    try {
        const note = yield note_1.default.findById(note_id);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        if (note.owner_id !== payload.user._id) {
            return res.status(401).json({ message: "You can't edit this note" });
        }
        yield note_1.default.findByIdAndUpdate(note_id, { favorite: !note.favorite });
        return res.status(200).json({ message: "Note updated", note });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
});
exports.setFavorite = setFavorite;
