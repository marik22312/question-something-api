import passport from "passport";
import {
	Strategy as JWTStrategy,
	ExtractJwt,
	StrategyOptions,
} from "passport-jwt";
import * as passportJWT from "passport-jwt";
import { SECRET_AUTH_TOKEN } from "../config";

export class Authenticator {
	private strategy: JWTStrategy;

	constructor() {
		this.strategy = this.getJWTStrategy();
		passport.use(this.strategy);
	}

	public authenticate() {
		return passport.authenticate("jwt", { session: false });
	}

	private getJWTStrategy(): JWTStrategy {
		const strategy = JWTStrategy;
		const ExtractJWT = ExtractJwt;

		const strategyOpts: StrategyOptions = {
			jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
			secretOrKey: SECRET_AUTH_TOKEN,
		};

		return new JWTStrategy(strategyOpts, (payload, done) => {
			done(null, payload);
		});
	}
}
