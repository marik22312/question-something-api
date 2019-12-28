import { createLogger } from 'logzio-nodejs';
import { LOGZIO_TOKEN } from '../config';
import { Request, Response, NextFunction } from 'express';

const logger = createLogger({
		token: LOGZIO_TOKEN,
		host: 'listener.logz.io',
});

export default function(req: Request, res: Response, next: NextFunction) {
	console.log('Logged!');
	logger.log({
		method: req.method,
		address: req.url,
	});

	next();
}

export const GetQuestionByFilter = (filter) => {
	return logger.log({
		filter,
	});
};
