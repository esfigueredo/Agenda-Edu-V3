import { Router } from 'express';

class RouteList {
    public static listRoutes(router: Router, baseRoute: string): void {
        const routes: any[] = [];

        function processStack(stack: any[]) {
            stack.forEach((middleware: any) => {

                if (middleware.route) {
                    const route = middleware.route;
                    routes.push({
                        path: route.path,
                        methods: Object.keys(route.methods).map(method => method.toUpperCase()),
                    });
                } else if (middleware.name === 'router' && middleware.handle.stack) {
                    processStack(middleware.handle.stack);
                } 
            });
        };

        if (router.stack && Array.isArray(router.stack)) {
            processStack(router.stack);
        } else {
            console.log('Router stack não está definida ou não é um array.');
        };

        const formattedRoutes = routes.map((route) => {
            return `http://127.0.0.1:3030${baseRoute}${route.path} {methods: { ${route.methods.join(', ')}: true } }`;
        });

        console.log(' ');
        console.log('Rotas registradas na aplicação:');
        console.log('------------------------------------------------------------------------------------------');
        console.log('==========================================================================================');
        formattedRoutes.forEach(route => console.log("   ", route));
        console.log('==========================================================================================');
        console.log('------------------------------------------------------------------------------------------');
        console.log(' ');
    };
};

export default RouteList;
