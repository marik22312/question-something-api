export const Request = () => {
	return {
		sendStatus: jest.fn(),
		send: jest.fn(),
		json: jest.fn(),
	};
};

export const Router = () => ({
	get: jest.fn(),
	post: jest.fn(),
	put: jest.fn(),
	delete: jest.fn(),
});
