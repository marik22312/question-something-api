import { Request, Response } from "express";
import { CategoryModel } from '../../models';

export const getAllCategories = async (req: Request, res: Response) => {
	const categories = await CategoryModel.find().exec();
	return res.json(categories);
};
