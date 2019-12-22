import mongoose from "mongoose";
import { LikeSchema, ILikes } from "../schemas";

export const LikesModel = mongoose.model<ILikes>("like", LikeSchema);
