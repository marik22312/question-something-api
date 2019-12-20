import { Server } from "./server";
import { SERVER_PORT } from "./config";

new Server().setPort(SERVER_PORT).listen();
