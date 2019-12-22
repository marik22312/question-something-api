import { Request, Response } from "express";
import { QuestionModel, LikesModel } from '../../models';
import * as Joi from '@hapi/joi';

interface IHandlerBody {
	device_id: string;
}

export const likeQuestion = async (req: Request, res: Response) => {
	const body = req.body as IHandlerBody;

	const questionId: string = req.params.questionId;
	let question;
	try {
		question = await QuestionModel.findById(questionId).exec();
	} catch (err) {
		return res.send(err.message);
	}

	if (!question) {
		return res.sendStatus(404);
	}

	const RequestSchema = Joi.object().keys({
		device_id: Joi.string().required(),
	});

	const validation = Joi.validate(body, RequestSchema);

	if (validation.error) {
		return res
				.sendStatus(400);
		}

	const isLikedAlready = await LikesModel.findOne({
		$and: [
			{liked_by: body.device_id},
			{question_id: question._id},
		],
	});

	if (isLikedAlready) {
		return res.sendStatus(200);
	}

	const like = await LikesModel.create({
		question_id: question._id,
		liked_by: body.device_id,
	});

	QuestionModel.findByIdAndUpdate(question._id, {
		$inc: {
			no_of_likes: 1,
		},
	}).exec();

	return res.sendStatus(201);
};
