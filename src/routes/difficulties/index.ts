import { Router, Request, Response } from 'express';
import { getAllDifficulties } from '../../controllers/difficulties';

const router = Router();

router
	.get('/', getAllDifficulties);

export const DifficultiesRoutes = router;