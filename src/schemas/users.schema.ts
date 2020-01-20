import { Document, Schema } from "mongoose";

export interface IUsers extends Document {
	email: string;
	password: string;
	roles: string[];
}

export const UserSchema: Schema<IUsers> = new Schema({
	email: {
		type: Schema.Types.String,
		required: true,
		unique: true,
		index: true,
	},
	password: {
		type: Schema.Types.String,
		required: true,
	},
	roles: [{
		type: Schema.Types.ObjectId,
		ref: 'Role',
	}],
});
