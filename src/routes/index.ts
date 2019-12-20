import { Router } from 'express';
import { QuestionsRoutes } from './questions';

const router = Router();

router.use('/questions', QuestionsRoutes)

export const questionsSomethingApiRoutes = router;
