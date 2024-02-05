import mongoose from "mongoose";
import { NoteInterface } from "../interfaces/note.interface";
import Category from "./category";

const NoteSchema = new mongoose.Schema<NoteInterface>({
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
    default: 5,
  },
  favorite: {
    type: Boolean,
    required: false,
    default: false,
  },
  category_id: {
    type: String,
    required: false,
    default: null,
    ref: "Category",
  },
});

const Note = mongoose.model<NoteInterface>("Note", NoteSchema);

export default Note;
