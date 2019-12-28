import { Model } from 'mongoose';
import { IQuestion} from '../schemas';
import { QuestionModel } from '../models';

export interface IQuestionsServiceConstructor {
	model: Model<IQuestion>;
}

export interface Filter {
	categories?: string[];
	difficulties?: string[];
}

export class QuestionsService {

	private readonly model: Model<IQuestion>;

	constructor() {
		this.model = QuestionModel;
	}

	public getAll(): Promise<IQuestion[]> {
		return this.model.find().exec();
	}

	public getAllByFilter(filter: Filter): Promise<IQuestion[]> {
		let query = {};
		const conditions: object[] = [];

		if (filter.categories) {
			conditions.push({
				categories: {
					$in: filter.categories,
				},
			});
		}
		if (filter.difficulties) {
			conditions.push({
				difficulties: {
					$in: filter.difficulties,
				},
			});
		}

		if (conditions.length !== 0) {
			query = {
				...query,
				$and: conditions,
			};
		}

		return this.model.find(query).exec();
	}
}
