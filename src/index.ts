import "./env";

import { Server } from "./server";
import { SERVER_PORT } from "./config";
import { questionsSomethingApiRoutes } from "./routes";
import {absolutePath as pathToSwaggerUi} from 'swagger-ui-dist';
import { connect } from "./models";
import BodyParser from 'body-parser';

const server = new Server()
.setPort(SERVER_PORT)
.use('/',  BodyParser.json())
.withRouter("/api", questionsSomethingApiRoutes)
.withStatic('/api/swagger', pathToSwaggerUi())
.listen();

connect();
export default server;
