import express from 'express';
import cors from 'cors';
import routes from './routes';

class App {
    constructor() {
        this.app = express();
        this.middlwares();
        this.routes();
    }

    middlwares() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {
        this.app.use(routes);
    }

}

export default new App().app;