import { Request, Response } from "express";
import { QuestionModel } from '../../models';

export const getAllQuestions = async (req: Request, res: Response) => {
	const questions = await QuestionModel.find().exec();

	return res.json(questions);
};
