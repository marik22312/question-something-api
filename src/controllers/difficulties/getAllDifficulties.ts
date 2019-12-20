import { Request, Response } from "express";
import Chance from 'chance';

const chance = new Chance();

export const getAllDifficulties = async (req: Request, res: Response) => {
	const fakeDifficulty = () => ({
			_id: chance.guid(),
			key: chance.string()
		})

	res.json([fakeDifficulty(), fakeDifficulty(), fakeDifficulty()])
}