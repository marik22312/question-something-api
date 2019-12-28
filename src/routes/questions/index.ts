import { Router, Request, Response } from 'express';
import { getAllQuestions, likeQuestion, dislikeQuestion } from '../../controllers/questions';
import { QuestionsService, Filter } from '../../controllers/QuestionsService';

const router = Router();

router
	.get('/', async (req, res) => {
		const questionsService = new QuestionsService();

		if (req.query.filter) {

			const filter = JSON.parse(req.query.filter) as Filter;
			const filteredQuestions = await questionsService.getAllByFilter(filter);

			return res.json(filteredQuestions);
		}

		const questions = await questionsService.getAll();

		res.json(questions);
	})
	.post('/:questionId/likes', likeQuestion)
	.post('/:questionId/dislikes', dislikeQuestion);

export const QuestionsRoutes = router;
