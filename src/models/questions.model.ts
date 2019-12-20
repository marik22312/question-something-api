import mongoose from "mongoose";
import { IQuestion } from "schemas/question.schema";
import { QuestionSchema } from "../schemas";

export const QuestionModel = mongoose.model<IQuestion>("question", QuestionSchema);
