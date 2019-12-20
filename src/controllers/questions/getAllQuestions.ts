import { Request, Response } from "express";
import Chance from 'chance';

const chance = new Chance();

export const getAllQuestions = async (req: Request, res: Response) => {
	const fakeQuestion = () => ({
		_id: chance.guid(),
		question: chance.sentence() + '?',
		no_of_likes: chance.integer({min: 0, max: 572}),
		no_of_dislikes: chance.integer({min: 0, max: 374}),
		categories: [{
			_id: '5dfd3f02acb89a860bd28578',
			key: 'someCategory',
		}],
		difficulties: [{
			_id: '5dfd3f02acb89a860bd28578',
			key: 'hard',
		}],
	});

	res.json([fakeQuestion(), fakeQuestion(), fakeQuestion()]);
};
