import passport from "passport";
import { Strategy } from "passport-jwt";

export class Authenticator {
	private strategy: Strategy;

	constructor({ strategy }) {
		this.strategy = strategy;
		passport.use(this.strategy);
	}

	public authenticate() {
		return passport.authenticate("jwt", { session: false });
	}
}
