import express, { json } from 'express';
import routes from './routes.js';
import { resolve } from 'node:path';
import { fileURLToPath } from "url";
import cors from 'cors';

// Corrige o __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, "..");

const corsOptions = {
    origin: 'https://devburger-fe.vercel.app',
    optionsSuccessStatus: 200 
};

class App {
    constructor() {
        this.app = express();
        this.midlewares();
        this.routes();
        //this.app.use(cors());
    }

    midlewares() {
        this.app.use(json());
        this.app.use(cors(corsOptions));
        this.app.use('/product-files', express.static(resolve(__dirname + '/assets')));
        this.app.use('/category-files', express.static(resolve(__dirname + '/assets')));
    }

    routes() {
        this.app.use(routes)
        //this.app.use(cors());
    }
}
export default new App().app;