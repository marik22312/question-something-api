import { Router, Request, Response } from 'express';
import { getAllQuestions } from '../../controllers/questions';

const router = Router();

router
	.get('/', getAllQuestions);

export const QuestionsRoutes = router;