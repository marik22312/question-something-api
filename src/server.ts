import Express, { Express as ExpressInstance, Request, Response } from 'express';
import BodyParser from 'body-parser';

export class Server {
	
	private readonly server: ExpressInstance;
	private _port: number;

	constructor() {
		this.server = Express();
		this._port = 4200;
	}

	public listen(port?: number): void {
		this._port = port || this._port;

		this.withRoute();

		this.server.listen(process.env.PORT || this._port, () => {
			console.log(`Server is listening on port ${this._port}`);
		})
		return;
	}

	private withRoute() {
		this.server.get('*', (req: Request, res: Response) => {
			res.sendStatus(200);
		});
	}

	public get port() {
		return this._port;
	}

	public kill() {
		return;
	}
}