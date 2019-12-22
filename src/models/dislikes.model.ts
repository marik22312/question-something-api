import mongoose from "mongoose";
import { DislikesSchema, IDislikes } from "../schemas";

export const DislikeModel = mongoose.model<IDislikes>("dislike", DislikesSchema);
