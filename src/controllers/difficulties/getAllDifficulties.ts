import { Request, Response } from "express";
import { DifficultyModel } from '../../models';

export const getAllDifficulties = async (req: Request, res: Response) => {

	const difficulties = await DifficultyModel.find().exec();

	res.json(difficulties);
};
