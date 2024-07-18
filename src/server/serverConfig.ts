import express, { Application } from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';

class ServerConfig {
    private app: Application;

    constructor() {
        this.app = express();
        this.configureMiddleware();
    };

    private configureMiddleware(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(compression());
        this.app.use(helmet());
    };

    public getApp(): Application {
        return this.app;
    };
};

export default ServerConfig;
