import Express, { Express as ExpressInstance, Router, RequestHandler } from 'express';
import { Server as HttpServer } from 'http';


export class Server {
	
	private readonly server: ExpressInstance;
	private _port: number;
	private _httpServer: HttpServer | null;

	constructor() {
		this.server = Express();
		this._port = 4200;
		this._httpServer = null;
	}

	public listen(): Server {
		this._httpServer = this.server.listen(this._port, () => {
			console.log(`Server is listening on port ${this._port}`);
		})
		return this;
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
		this._httpServer?.close()
		return;
	}

	public withStatic(apiPath: string, staticsPath: string) {
		this.server.use(apiPath, Express.static(staticsPath))
		return this;
	}
}