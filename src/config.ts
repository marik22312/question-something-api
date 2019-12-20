export const SERVER_PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 4200;
export const DB_CONNECTION: string = process.env.MONGODB_URI;
