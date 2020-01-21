declare namespace NodeJS {
	export interface ProcessEnv {
	  PORT: string;
	  MONGODB_URI: string;
	  LOGZIO_TOKEN: string;
	  SECRET_AUTH_TOKEN: string;
	}
  }

  declare module 'logzio-nodejs';

  declare namespace Express {
   export interface Request {
      user?: any
   }
}