export const Request = () => {
	return {
		sendStatus: jest.fn(),
		send: jest.fn(),
		json: jest.fn(),
	};
};
