import "./env";

import { Server } from "./server";
import { SERVER_PORT } from "./config";
import { questionsSomethingApiRoutes } from "./routes";
import { connect } from "./models";
import expressLogger from "./express-logger";
import BodyParser from 'body-parser';
import { AuthRouter } from './routes/AuthRouter/Auth.router';
import cors from 'cors';

const server = new Server()
.setPort(SERVER_PORT)
.use('/',  BodyParser.json())
.use('/',  cors())
// .use('/',  expressLogger)
.withRouter("/", AuthRouter)
.withRouter("/api", questionsSomethingApiRoutes)
.listen();

connect();
export default server;
