import { Router } from 'express';
import { QuestionsRoutes } from './questions';
import { DifficultiesRoutes } from './difficulties';
import { CategoriesRoutes } from './categories';

const router = Router();

router.use('/questions', QuestionsRoutes).use('/difficulties', DifficultiesRoutes).use('/categories', CategoriesRoutes)

export const questionsSomethingApiRoutes = router;
