import moongose from "mongoose";
import { NoteInterface } from "../interfaces/note.interface";

const NoteSchema = new moongose.Schema<NoteInterface>({
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

const Note = moongose.model<NoteInterface>("Note", NoteSchema);

export default Note;
