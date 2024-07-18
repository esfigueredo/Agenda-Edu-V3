import { Server } from "http";
import { Application } from "express";
import ServerConfig from "./serverConfig";
import RoutesConfig from "../routes/config/routesConfig";
import RouteList from "../routes/config/routeList";
//import ErrorHandling from "../utils/errorHandling";
class ServerAPI {
    private app: Application;
    private serverInstance: Server | null = null;
    private baseRoute = process.env.BASE_ROUTE || "/api/dev/agenda-edu";

    constructor() {
        this.app = new ServerConfig().getApp();
        this.setupRoutes();
       //this.setupErrorHandling();
    };

    private setupRoutes(): void {
        const router = new RoutesConfig(this.baseRoute).getRouter();
        this.app.use(this.baseRoute, router);
    };

    // private setupErrorHandling(): void {
    //     this.app.use(ErrorHandling.notFoundHandler); 
    //     this.app.use(ErrorHandling.errorHandler); 
    // };

    private listRoutes(): void {
        RouteList.listRoutes(this.app._router, this.baseRoute);
    };

    public start(port: number): void {
        this.serverInstance = this.app.listen(port, () => {
            console.log(' ');
            console.log(`🚀 Aplicação iniciada na rota: http://127.0.0.1:${port}`);
            this.listRoutes();
        });
    };

    public stop(done: (err?: Error) => void): void {
        if (this.serverInstance) {
            this.serverInstance.close(done);
        } else {
            done();
        }
    };

    public getApp(): Application {
        return this.app;
    };
};

const serverAPI = new ServerAPI();
export default serverAPI;
