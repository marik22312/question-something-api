import { Server } from './server';

describe('Server Tests', () => {

	let server;

	beforeEach(() => {
		server = new Server();
	})

	it('Should set port', () => {
		const port = 7357;
		server.setPort(port);
		expect(server.port).toBe(port);
	});
})