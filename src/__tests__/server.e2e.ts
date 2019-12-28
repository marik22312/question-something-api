import request, { SuperTest } from 'supertest';
import server from '../index';

describe('App Endpoints', () => {
	let app: any;

	beforeAll(async () => {
		app = await request(server);
	});

	describe('Quetions Endpoints', () => {

		it('should fetch all questions', async () => {
			const res = await app.get('/api/questions');
			expect(res.status).toEqual(200);
			expect(Array.isArray(res.body)).toBe(true);
		});
	});

});
