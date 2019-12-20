import { Request, Response } from "express";
import Chance from 'chance';

const chance = new Chance();

export const getAllCategories = async (req: Request, res: Response) => {
	const fakeCategory = () => ({
			_id: chance.guid(),
			key: chance.string()
		})

	res.json([fakeCategory(), fakeCategory(), fakeCategory()])
}