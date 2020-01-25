declare namespace NodeJS {
	export interface ProcessEnv {
		PORT: string;
		MONGODB_URI: string;
		LOGZIO_TOKEN: string;
		SECRET_AUTH_TOKEN: string;
		GOOGLE_AUTH_API_KEY: string;
		GOOGLE_AUTH_AUD_KEY: string;
	}
  }

  declare module 'logzio-nodejs';