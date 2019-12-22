import Express, { Express as ExpressInstance, Router, RequestHandler, Handler } from 'express';
import { Server as HttpServer } from 'http';

export class Server {

	private readonly server: ExpressInstance;
	private assignedPort: number;
	private httpServer: HttpServer | null;

	constructor() {
		this.server = Express();
		this.assignedPort = 4200;
		this.httpServer = null;
	}

	public listen(): Server {
		this.httpServer = this.server.listen(this.assignedPort, () => {
			// tslint:disable-next-line: no-console
			console.log(`Server is listening on port ${this.assignedPort}`);
		});
		return this;
	}

	public setPort(port: number): Server {
		this.assignedPort = port || this.assignedPort;
		return this;
	}

	public withRouter(path: string, router: Router): Server {
		this.server.use(path, router);
		return this;
	}

	public use(path: string, handler: Handler): Server {
		this.server.use(path, handler);
		return this;
	}

	public get port() {
		return this.assignedPort;
	}

	public kill() {
		this.httpServer?.close();
		return;
	}

	public withStatic(apiPath: string, staticsPath: string) {
		this.server.use(apiPath, Express.static(staticsPath));
		return this;
	}
}
