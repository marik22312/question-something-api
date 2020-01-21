import { IdentityService, AuthUserObj } from '../services/identity.service';
import { Request, Response, NextFunction } from 'express';

export class Authenticator {
	private identityService: IdentityService;
	constructor(identityService) {
		this.identityService = identityService;

		this.authenticateToken = this.authenticateToken.bind(this);
	}

	public authenticateToken(req: Request, res: Response, next: NextFunction) {
		const token = req.headers.authorization;

		if (!token) {
			return res.sendStatus(401);
		}
		const user = this.identityService.verifyToken(token);
		if (!user) {
				return res.sendStatus(401);
			}
		req.user = { ...user };
		next();
	}
}
