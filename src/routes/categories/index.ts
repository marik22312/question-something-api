import { Router, Request, Response } from 'express';
import { CategoriesService } from '../../controllers';
import { Authenticator } from '../../middlewares/Authenticator';
import { ICategory } from '../../schemas';

const router = Router();
const categoriesService = new CategoriesService();
const authenticator = new Authenticator();

router
	.get('/', async (req, res) => {
		const categories = await categoriesService.getAll();

		return res.json({categories});
	})
	.post('/', authenticator.authenticate(), async (req: Request, res: Response) => {
		try {
			const category = req.body as ICategory;
			CategoriesService.validateCategoryDto(category);
			const newCategory = await categoriesService.create(category);
			res.status(201).json(newCategory);

		} catch (err) {
			res.status(500).send(err);
		}

	});

export const CategoriesRoutes = router;
