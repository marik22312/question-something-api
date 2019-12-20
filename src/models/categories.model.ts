import mongoose from "mongoose";
import { CategorySchema, ICategory } from "../schemas";

export const CategoryModel = mongoose.model<ICategory>("category", CategorySchema);
