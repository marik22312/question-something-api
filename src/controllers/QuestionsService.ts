import { Model, Types as MongooseTypes } from "mongoose";
import { IQuestion } from "../schemas";
import { QuestionModel } from "../models";
import * as Joi from "@hapi/joi";

export interface IQuestionsServiceConstructor {
	model: Model<IQuestion>;
}

export interface Filter {
	categories?: string[];
	difficulties?: string[];
}

export class QuestionsService {
	public static readonly limit: number = 20;

	public static validateQuestionDto(question: IQuestion) {
		const validation = Joi.validate(question, this.questionValidationSchema);

		if (validation.error) {
			throw validation.error.message;
		}

		question.difficulties.forEach((difficulty) => {
			if (!MongooseTypes.ObjectId.isValid(difficulty)) {
				throw new Error(`difficulty ${difficulty} is not a valid ObjectID!`);
			}
		});
		question.categories.forEach((category) => {
			if (!MongooseTypes.ObjectId.isValid(category)) {
				throw new Error(`category ${category} is not a valid ObjectID!`);
			}
		});
		return true;
	}

	private static readonly questionValidationSchema = Joi.object().keys({
		question: Joi.string()
			.required()
			.min(3)
			.max(256),
		difficulties: Joi.array()
			.items(Joi.string())
			.min(1)
			.required(),
		categories: Joi.array()
			.items(Joi.string())
			.min(1)
			.required(),
	});

	private readonly model: Model<IQuestion>;

	constructor() {
		this.model = QuestionModel;
	}

	public getAll(cursor: number = 0): Promise<IQuestion[]> {
		return this.model
			.find()
			.populate('categories', '_id key')
			.populate('difficulties', '_id key')
			.skip(cursor)
			.limit(QuestionsService.limit)
			.exec();
	}

	public getAllByFilter(
		filter: Filter,
		cursor: number = 0,
	): Promise<IQuestion[]> {
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

		return this.model
			.find(query)
			.skip(cursor)
			.limit(QuestionsService.limit)
			.exec();
	}

	public create(question: IQuestion): Promise<IQuestion> {
		return this.model.create(question);
	}
}
