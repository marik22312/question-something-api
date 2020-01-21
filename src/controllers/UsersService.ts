import { Model } from "mongoose";
import { IUsers } from "../schemas";
import { UsersModel } from "../models";

export interface IUsersServiceConstructor {
	model: Model<IUsers>;
}

export interface Filter {
	categories?: string[];
	difficulties?: string[];
}

export class UsersService {
	public static readonly limit: number = 20;

	private readonly model: Model<IUsers>;

	constructor() {
		this.model = UsersModel;
	}

	public getUserById(id: string): Promise<IUsers | null> {
		return this.model.findById(id).populate('roles').exec();
	}
	public getUserByEmail(email: string): Promise<IUsers | null> {
		return this.model.findOne({email}).populate('roles').exec();
	}
}
