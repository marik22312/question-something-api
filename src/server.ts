import Express, { Express as ExpressInstance, Request, Response, Router } from 'express';
import BodyParser from 'body-parser';

export class Server {
	
	private readonly server: ExpressInstance;
	private _port: number;

	constructor() {
		this.server = Express();
		this._port = 4200;
	}

	public listen(): void {
		this.server.listen(this._port, () => {
			console.log(`Server is listening on port ${this._port}`);
		})
		return;
	}

	public setPort(port: number): Server {
		this._port = port || this._port;
		return this;
	}

	public withRouter(path: string, router: Router): Server {
		this.server.use(path, router);
		return this;
	}

	public get port() {
		return this._port;
	}

	public kill() {
		return;
	}
}