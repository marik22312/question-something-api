import mongoose from "mongoose";
import { DifficultySchema, IDifficulty } from "../schemas";

export const DifficultyModel = mongoose.model<IDifficulty>("difficulty", DifficultySchema);
