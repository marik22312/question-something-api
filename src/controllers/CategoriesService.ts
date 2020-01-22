import { Model, Schema, Types as  MongooseTypes } from 'mongoose';
import { ICategory} from '../schemas';
import { CategoryModel } from '../models';
import * as Joi from '@hapi/joi';

export interface ICategoriesServiceConstructor {
	model: Model<ICategory>;
}

export class CategoriesService {

	public static validateCategoryDto(category: ICategory) {
		const validation = Joi.validate(category, this.categoryValidationSchema);

		if (validation.error) {
			throw validation.error.message;
		}

		category.difficulties.forEach((difficulty) => {
			if (!MongooseTypes.ObjectId.isValid(difficulty)) {
				throw new Error(`difficulty ${difficulty} is not a valid ObjectID!`);
			}
		});
		return true;
	}
	private static readonly categoryValidationSchema = Joi.object().keys({
		key: Joi.string().required().min(3).max(64),
		difficulties: Joi.array().items(Joi.string()).min(1).required(),
		icon: Joi.string().empty(),
	});

	private readonly model: Model<ICategory>;

	constructor() {
		this.model = CategoryModel;
	}

	public getAll(): Promise<ICategory[]> {
		return this.model.find().populate('difficulties').exec();
	}

	public create(category: ICategory): Promise<ICategory> {
		return this.model.create(category);
	}
}
