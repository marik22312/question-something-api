import { Router, Request, Response } from 'express';
import { CategoriesService } from '../../controllers';

const router = Router();
const categoriesService = new CategoriesService();

router
	.get('/', async (req, res) => {
		const categories = await categoriesService.getAll();

		return res.json(categories);
	});

export const CategoriesRoutes = router;
