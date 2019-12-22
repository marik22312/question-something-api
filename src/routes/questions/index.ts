import { Router, Request, Response } from 'express';
import { getAllQuestions, likeQuestion } from '../../controllers/questions';

const router = Router();

router
	.get('/', getAllQuestions)
	.post('/:questionId/likes', likeQuestion);

export const QuestionsRoutes = router;
