import { Document, Schema } from "mongoose";

export interface IDifficulty extends Document {
	key: string;
}

export const DifficultySchema: Schema<IDifficulty> = new Schema({
	key: {
		type: Schema.Types.String,
		unique: true,
		index: true,
		required: true,
	},
});
