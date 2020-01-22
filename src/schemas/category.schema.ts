import { Document, Schema } from "mongoose";

export interface ICategory extends Document {
	key: string;
	difficulties: string[];
	icon: string;
}

export const CategorySchema: Schema<ICategory> = new Schema({
	key: {
		type: Schema.Types.String,
		unique: true,
		index: true,
		required: true,
	},
	difficulties: [{
		type: Schema.Types.ObjectId,
		index: true,
		ref: 'difficulty',
	}],
	icon: {
		type: Schema.Types.String,
		required: true,
	},
});
