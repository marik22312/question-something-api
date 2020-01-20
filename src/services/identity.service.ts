import { IUsers } from '../schemas';
import { sign, verify } from 'jsonwebtoken';

export interface IdentityServiceConstructorProps {
	secret: string;
}

export interface AuthUserObj {
	_id: IUsers['_id'];
	roles: IUsers['roles'];
}
export interface VerifiedUserDto {
	_id: IUsers['_id'];
	roles: IUsers['roles'];
}

export class IdentityService {

	public static readonly DEFAULT_TOKEN_EXPIRATION: number = 1000 * 60 * 60 * 15; // ms s m d
	private readonly secret: string;

	constructor(constructorObj: IdentityServiceConstructorProps) {
		this.secret = constructorObj.secret;
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
}
