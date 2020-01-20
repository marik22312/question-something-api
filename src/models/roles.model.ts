import mongoose from "mongoose";
import { RolesSchema, IRoles } from "../schemas";

export const RolesModel = mongoose.model<IRoles>("role", RolesSchema);
