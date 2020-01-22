import { Router, Request, Response } from 'express';
import { IdentityService } from '../../services/identity.service';
import { SECRET_AUTH_TOKEN } from '../../config';
import { UsersService } from '../../controllers/UsersService';
import { Authenticator } from '../../middlewares/Authenticator';
import * as passportJWT from "passport-jwt";

const router = Router();

const usersService = new UsersService();
const identityService = new IdentityService({
	secret: SECRET_AUTH_TOKEN,
	usersService,
});

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const strategyOpts: passportJWT.StrategyOptions = {
	jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
	secretOrKey: SECRET_AUTH_TOKEN,
};

const strategy = new JWTStrategy(strategyOpts, (payload, done) => {
	done(null, payload);
});
const authenticator = new Authenticator({strategy});

router
	.get('/authenticate', async (req: Request, res: Response) => {
		const reqBody = req.body;

		try {
			const response = await identityService.authenticateUserByEmailAndPassword(reqBody.email, reqBody.password);
			return res.json(response);
		} catch (error) {
			res.status(500).send(error.message);
		}
	});

export const AuthRouter = router;
