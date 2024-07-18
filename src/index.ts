import 'dotenv/config';
import ServerAPI from './server/server';

const PORT: number = parseInt(process.env.PORT as string, 10) || 3030;
const BASE_ROUTE_DEV  = process.env.BASE_ROUTE_DEV ;

const server =  ServerAPI;

ServerAPI.start(PORT);
