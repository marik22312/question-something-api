import { Document, Schema } from "mongoose";

export interface IRoles extends Document {
	key: string;
}

export const RolesSchema: Schema<IRoles> = new Schema({
	key: {
		type: Schema.Types.String,
	},
});
