declare namespace NodeJS {
	export interface ProcessEnv {
	  PORT: string;
	  MONGODB_URI: string;
	  LOGZIO_TOKEN: string;
	}
  }

  declare module 'logzio-nodejs';