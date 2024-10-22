import { Request, Response } from "express";
import Note from "../models/note";
import Category from "../models/category";
import { decryptToken } from "../utils/jwt";
import User from "../models/user";

const test = async (req: Request, res: Response) => {
  await res.send("funciona");
};

const createNote = async (req: Request, res: Response) => {
  const { title, description, priority, favorite, category } = req.body;
  const token = req.headers.authorization?.split(" ")[1];
  const payload: any = decryptToken(token);
  try {
    const searchUser = await User.findById(payload.user._id);
    if (!searchUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const newNote = await Note.create({
      owner_id: payload.user._id,
      title,
      description,
      priority,
      favorite,
      category,
    });
    return res.status(200).json({ message: "Note created", note: newNote });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const editNote = async (req: Request, res: Response) => {
  const { title, description, priority, favorite, category_id } = req.body;
  const { note_id } = req.params;
  const token = req.headers.authorization?.split(" ")[1];
  const payload: any = decryptToken(token);
  try {
    const searchNote = await Note.findById(note_id);
    if (!searchNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    if (searchNote.owner_id !== payload.user._id) {
      return res.status(401).json({ message: "You can't edit this note" });
    }
    await Note.findByIdAndUpdate(note_id, {
      title,
      description,
      priority,
      favorite,
      category_id,
    });
    return res.status(200).json({ message: "Note updated" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const deleteNote = async (req: Request, res: Response) => {
  const { note_id } = req.params;
  const token = req.headers.authorization?.split(" ")[1];
  const payload: any = decryptToken(token);
  try {
    const searchNote = await Note.findById(note_id);
    if (!searchNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    if (searchNote.owner_id !== payload.user._id) {
      return res.status(401).json({ message: "You can't delete this note" });
    }
    await Note.findByIdAndDelete(note_id);
    return res.status(200).json({ message: "Note deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  const token = req.headers.authorization?.split(" ")[1];
  const payload: any = decryptToken(token);
  try {
    const searchUser = await User.findById(payload.user._id);
    if (!searchUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const newCategory = await Category.create({
      owner_id: payload.user._id,
      name,
    });
    return res
      .status(200)
      .json({ message: "Category created", category: newCategory });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const getNotes = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];
  const payload: any = decryptToken(token);
  try {
    const notes = await Note.find({ owner_id: payload.user._id }).exec();
    return res.status(200).json({ notes });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const getCategories = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];
  const payload: any = decryptToken(token);
  try {
    const categories = await Category.find({ owner_id: payload.user._id });
    return res.status(200).json({ categories });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const setFavorite = async (req: Request, res: Response) => {
  const { note_id } = req.params;
  const token = req.headers.authorization?.split(" ")[1];
  const payload: any = decryptToken(token);
  try {
    const note = await Note.findById(note_id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    if (note.owner_id !== payload.user._id) {
      return res.status(401).json({ message: "You can't edit this note" });
    }
    await Note.findByIdAndUpdate(note_id, { favorite: !note.favorite });
    return res.status(200).json({ message: "Note updated", note });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export {
  test,
  createNote,
  editNote,
  deleteNote,
  createCategory,
  getNotes,
  getCategories,
  setFavorite,
};
