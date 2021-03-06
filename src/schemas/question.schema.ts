import { Schema, Document, Types as MongooseTypes } from 'mongoose';

export enum QuestionStatus {
	NEW = 'NEW',
	REVIEWED = 'REVIEWED',
	PUBLISHED = 'PUBLISHED',
}
export interface IQuestion extends Document {
	question: string;
	no_of_likes: number;
	no_of_dislikes: number;
	categories: MongooseTypes.ObjectId[];
	difficulties: MongooseTypes.ObjectId[];
	status?: QuestionStatus;
}

const QuestionSchema: Schema = new Schema({
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
	categories: [{
		type: Schema.Types.ObjectId,
		ref: 'category',
		default: [],
	}],
	difficulties: [{
		type: Schema.Types.ObjectId,
		ref: 'difficulty',
		default: [],
	}],
	status: {
		type: Schema.Types.String,
		default: QuestionStatus.NEW,
	},
});

QuestionSchema.index({
	question: 'text',
});

export { QuestionSchema };
