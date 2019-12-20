import { Router, Request, Response } from 'express';
import { getAllCategories } from '../../controllers/categories';

const router = Router();

router
	.get('/', getAllCategories);

export const CategoriesRoutes = router;