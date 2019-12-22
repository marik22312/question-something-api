import { Router, Request, Response } from 'express';
import { getAllQuestions, likeQuestion, dislikeQuestion } from '../../controllers/questions';

const router = Router();

router
	.get('/', getAllQuestions)
	.post('/:questionId/likes', likeQuestion)
	.post('/:questionId/dislikes', dislikeQuestion);

export const QuestionsRoutes = router;
