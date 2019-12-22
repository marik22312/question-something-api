import { Document, Schema } from "mongoose";

export interface IDislikes extends Document {
	question_id: Schema.Types.ObjectId;
	liked_by: string;
}

export const DislikesSchema: Schema<IDislikes> = new Schema({
	question_id: {
		type: Schema.Types.ObjectId,
		ref: 'questions',
		index: true,
		required: true,
	},
	disliked_by: {
		type: Schema.Types.String,
		index: true,
		required: true,
	},
});
