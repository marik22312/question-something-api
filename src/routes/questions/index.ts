import { Router, Request, Response } from "express";
import {
	getAllQuestions,
	likeQuestion,
	dislikeQuestion,
} from "../../controllers/questions";
import { QuestionsService, Filter } from "../../controllers/QuestionsService";
import { Authenticator } from '../../middlewares/Authenticator';
import { IQuestion } from '../../schemas';

const router = Router();
const authenticator = new Authenticator();
const questionsService = new QuestionsService();

router
	.get("/", async (req, res) => {

		let cursor = req.query.cursor || "0";
		cursor = parseInt(cursor, 10);
		const deviceId: string = req.headers['x-icbrkr-device'] as string || '';

		if (req.query.filter) {
			const filter = JSON.parse(req.query.filter) as Filter;
			const filteredQuestions = await questionsService.getAllByFilter(
				filter,
				cursor,
				deviceId,
			);

			return res.json({questions: filteredQuestions});
		}

		const questions = await questionsService.getAll(cursor);

		res.json({ questions, nextCursor: QuestionsService.limit + cursor });
	})
	.post("/", authenticator.authenticate(), async (req: Request, res: Response) => {
		try {
			const Question = req.body as IQuestion;
			QuestionsService.validateQuestionDto(Question);
			const newQuestion = await questionsService.create(Question);
			res.status(201).json(newQuestion);
		} catch (err) {
			res.status(500).send(err);
		}
	})
	.post("/bulk", authenticator.authenticate(), async (req: Request, res: Response) => {
		try {
			const body = req.body;
			const questions = body.questions as IQuestion[];
			const newQuestion = await questionsService.create(questions);
			res.status(201).json(newQuestion);
		} catch (err) {
			res.status(500).send(err);
		}
	})
	.post("/:questionId/likes", likeQuestion)
	.post("/:questionId/dislikes", dislikeQuestion);

export const QuestionsRoutes = router;
