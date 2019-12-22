import mongoose from "mongoose";
import { QuestionSchema, IQuestion } from "../schemas";

export const QuestionModel = mongoose.model<IQuestion>("question", QuestionSchema);
