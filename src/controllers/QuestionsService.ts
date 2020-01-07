import { Model } from "mongoose";
import { IQuestion } from "../schemas";
import { QuestionModel } from "../models";

export interface IQuestionsServiceConstructor {
	model: Model<IQuestion>;
}

export interface Filter {
	categories?: string[];
	difficulties?: string[];
}

export class QuestionsService {
	public static readonly limit: number = 20;

	private readonly model: Model<IQuestion>;

	constructor() {
		this.model = QuestionModel;
	}

	public getAll(cursor: number = 0): Promise<IQuestion[]> {
		return this.model
			.find()
			.skip(cursor)
			.limit(QuestionsService.limit)
			.exec();
	}

	public getAllByFilter(
		filter: Filter,
		cursor: number = 0
	): Promise<IQuestion[]> {
		let query = {};
		const conditions: object[] = [];

		if (filter.categories) {
			conditions.push({
				categories: {
					$in: filter.categories
				}
			});
		}
		if (filter.difficulties) {
			conditions.push({
				difficulties: {
					$in: filter.difficulties
				}
			});
		}

		if (conditions.length !== 0) {
			query = {
				...query,
				$and: conditions
			};
		}

		return this.model
			.find(query)
			.skip(cursor)
			.limit(QuestionsService.limit)
			.exec();
	}
}
