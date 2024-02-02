import mongoose from "mongoose";
import { CategoryInterface } from "../interfaces/category.interface";

const CategorySchema = new mongoose.Schema<CategoryInterface>({
  name: { type: String, required: true },
  owner_id: { type: String, required: true },
});

const Category = mongoose.model<CategoryInterface>("Category", CategorySchema);

export default Category;
