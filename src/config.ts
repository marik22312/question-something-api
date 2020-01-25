export const SERVER_PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 4200;
export const DB_CONNECTION: string = process.env.MONGODB_URI;
export const LOGZIO_TOKEN: string = process.env.LOGZIO_TOKEN || '';
export const SECRET_AUTH_TOKEN: string = process.env.SECRET_AUTH_TOKEN;
export const GOOGLE_AUTH_API_KEY: string = process.env.GOOGLE_AUTH_API_KEY;
export const GOOGLE_AUTH_AUD_KEY: string = process.env.GOOGLE_AUTH_AUD_KEY;
