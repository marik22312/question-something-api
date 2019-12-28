import { Router, Request, Response } from 'express';
import { getAllDifficulties } from '../../controllers/difficulties';
import { DifficultiesService } from '../../controllers';

const router = Router();
const difficultiesService = new DifficultiesService();

router
	.get('/', async (req, res) => {
		const difficulties = await difficultiesService.getAll();

		return res.json(difficulties);
	});

export const DifficultiesRoutes = router;
