import { Model } from 'mongoose';
import { ICategory} from '../schemas';
import { CategoryModel } from '../models';

export interface ICategoriesServiceConstructor {
	model: Model<ICategory>;
}

export class CategoriesService {

	private readonly model: Model<ICategory>;

	constructor() {
		this.model = CategoryModel;
	}

	public getAll(): Promise<ICategory[]> {
		return this.model.find().exec();
	}
}
