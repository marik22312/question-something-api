import { IUsers } from "../schemas";
import { sign, verify } from "jsonwebtoken";
import { UsersService } from "../controllers/UsersService";

import bcrypt from "bcrypt";
import { OAuth2Client } from "google-auth-library";
import { GOOGLE_AUTH_AUD_KEY, GOOGLE_AUTH_API_KEY } from '../config';

export interface IdentityServiceConstructorProps {
	secret: string;
	usersService: any;
}

export interface AuthUserObj {
	_id: IUsers["_id"];
	email: IUsers["email"];
}
export interface VerifiedUserDto {
	_id: IUsers["_id"];
}

export interface AuthenticationResponse {
	user: AuthUserObj;
	token: string;
}

export class IdentityService {
	public static readonly DEFAULT_TOKEN_EXPIRATION: number = 1000 * 60 * 60 * 15; // ms s m d

	private readonly secret: string;
	private readonly usersService: UsersService;
	private readonly oauthClient: OAuth2Client;

	constructor(constructorObj: IdentityServiceConstructorProps) {
		this.secret = constructorObj.secret;
		this.usersService = constructorObj.usersService;
		this.oauthClient = new OAuth2Client(GOOGLE_AUTH_API_KEY);
	}

	public signAuthToken(user: AuthUserObj): string {
		return sign(user, this.secret, {
			expiresIn: IdentityService.DEFAULT_TOKEN_EXPIRATION,
		});
	}

	public verifyToken(token: string): AuthUserObj | null {
		try {
			return verify(token, this.secret) as AuthUserObj;
		} catch (err) {
			return null;
		}
	}

	public async authenticateUserByEmailAndPassword(
		email: string,
		password: string,
	): Promise<AuthenticationResponse> {
		const user = await this.usersService.getUserByEmail(email);
		if (!user) {
			throw Error("Wrong email or password");
		}
		const isMatch = await this.compareHash(password, user.password);
		if (!isMatch) {
			throw Error("Wrong email or password");
		}

		const userAuthObj: AuthUserObj = {
			_id: user._id,
			email: user.email,
		};
		const token = this.signAuthToken(userAuthObj);
		const response: AuthenticationResponse = {
			user: userAuthObj,
			token,
		};

		return response;
	}

	public async authenticateByGoogle(
		idToken: string,
	): Promise<AuthenticationResponse> {
		const ticket = await this.oauthClient.verifyIdToken({
			idToken,
			audience: GOOGLE_AUTH_AUD_KEY,
		});
		const payload = ticket.getPayload();

		if (!payload || !payload.email_verified || !payload.email) {
			throw new Error('Email Is Not verified!');
		}

		const email = payload.email;
		const user = await this.usersService.getUserByEmail(email);
		if (!user) {
			throw Error("Wrong email or password");
		}

		const userAuthObj: AuthUserObj = {
			_id: user._id,
			email: user.email,
		};
		const token = this.signAuthToken(userAuthObj);
		const response: AuthenticationResponse = {
			user: userAuthObj,
			token,
		};

		return response;
	}

	private hashPassword(password: string): Promise<string> {
		return bcrypt.hash(password, 10);
	}

	private compareHash(password: string, hash: string): Promise<boolean> {
		return bcrypt.compare(password, hash);
	}
}
