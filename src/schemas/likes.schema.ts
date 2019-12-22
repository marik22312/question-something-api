import { Document, Schema } from "mongoose";

export interface ILikes extends Document {
	question_id: Schema.Types.ObjectId;
	liked_by: string;
}

export const LikeSchema: Schema<ILikes> = new Schema({
	question_id: {
		type: Schema.Types.ObjectId,
		ref: 'questions',
		index: true,
		required: true,
	},
	liked_by: {
		type: Schema.Types.String,
		index: true,
		required: true,
	},
});
