import { Router, Request, Response } from 'express';
import { getAllQuestions, likeQuestion, dislikeQuestion } from '../../controllers/questions';
import { QuestionsService, Filter } from '../../controllers/QuestionsService';

const router = Router();

router
	.get('/', async (req, res) => {
		const questionsService = new QuestionsService();

		let cursor = req.query.cursor || '0';
		cursor = parseInt(cursor, 10);

		if (req.query.filter) {

			const filter = JSON.parse(req.query.filter) as Filter;
			const filteredQuestions = await questionsService.getAllByFilter(filter, cursor);

			return res.json(filteredQuestions);
		}

		const questions = await questionsService.getAll(cursor);

		res.json({questions, nextCursor: QuestionsService.limit + cursor});
	})
	.post('/:questionId/likes', likeQuestion)
	.post('/:questionId/dislikes', dislikeQuestion);

export const QuestionsRoutes = router;
