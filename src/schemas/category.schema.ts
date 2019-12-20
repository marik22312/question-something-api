import { Document, Schema } from "mongoose";

export interface ICategory extends Document {
	key: string;
}

export const CategorySchema: Schema<ICategory> = new Schema({
	key: {
		type: Schema.Types.String,
		unique: true,
		index: true,
		required: true,
	},
});
