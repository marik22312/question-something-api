import { Schema, Document } from 'mongoose';

export interface IQuestion extends Document {
	question: string;
	no_of_likes: number;
	no_of_dislikes: number;
	categories: Schema.Types.ObjectId;
	difficulties: Schema.Types.ObjectId;
}

export const QuestionSchema: Schema = new Schema({
	question: {
		type: Schema.Types.String,
		unique: true,
		index: true,
		required: true,
	},
	no_of_likes: {
		type: Schema.Types.Number,
		default: 0,
	},
	no_of_dislikes: {
		type: Schema.Types.Number,
		default: 0,
	},
	categories: {
		type: [Schema.Types.ObjectId],
		ref: 'category',
		default: [],
	},
	difficulties: {
		type: [Schema.Types.ObjectId],
		ref: 'difficulty',
		default: [],
	},
});
