import { Model } from 'mongoose';
import { IDifficulty, ICategory} from '../schemas';
import { DifficultyModel } from '../models';

export interface IDifficultiesServiceConstructor {
	model: Model<IDifficulty>;
}

export class DifficultiesService {

	private readonly model: Model<IDifficulty>;

	constructor() {
		this.model = DifficultyModel;
	}

	public getAll(): Promise<IDifficulty[]> {
		return this.model.find().exec();
	}
}
