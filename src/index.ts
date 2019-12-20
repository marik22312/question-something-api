import { Server } from "./server";
import { SERVER_PORT } from "./config";
import { questionsSomethingApiRoutes } from "./routes";

const server = new Server()
	.setPort(SERVER_PORT)
	.withRouter("/api", questionsSomethingApiRoutes)
	.listen();

export default server;
