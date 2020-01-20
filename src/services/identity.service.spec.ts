import { IdentityService, AuthUserObj } from "./identity.service";
import { sign } from 'jsonwebtoken';
describe('Identity Service', () => {
	let identityService: IdentityService;
	const fakeSecret: string = 'iAmFake!';

	beforeEach(() => {
		identityService = new IdentityService({ secret: fakeSecret });
	});

	it('Should sign the token', async () => {
		const fakeUser: AuthUserObj = {
			_id: 'SomeLongId',
			roles: ['string1', 'string2'],
		};
		const controllToken = sign(fakeUser, fakeSecret, {
			expiresIn: IdentityService.DEFAULT_TOKEN_EXPIRATION,
		});
		const token = identityService.signAuthToken(fakeUser);
		expect(token).toBe(controllToken);
	});

	it('Should verify token correctly', async () => {
		const fakeUser: AuthUserObj = {
			_id: "SomeLongId",
			roles: ["string1", "string2"],
		};
		const badToken = sign(fakeUser, 'badSecret');
		const token = identityService.signAuthToken(fakeUser);
		const verifiedObj = identityService.verifyToken(token);
		expect(verifiedObj).toBeTruthy();
		expect(identityService.verifyToken(badToken)).toBe(null);
	});
});
