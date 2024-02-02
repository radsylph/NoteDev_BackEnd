"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const NoteSchema = new mongoose_1.default.Schema({
    owner_id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    priority: {
        type: Number,
        required: true,
    },
    favorite: {
        type: Boolean,
        required: true,
        default: false,
    },
    category_id: {
        type: String,
        required: false,
        default: null,
    },
});
const Note = mongoose_1.default.model("Note", NoteSchema);
exports.default = Note;
