import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer.js';
import authMiddleware from './middleware/auth.js';

import UserController from './app/controllers/UserController.js';
import sessionController from './app/controllers/sessionController.js';
import ProductController from './app/controllers/ProductController.js';
import CategoryController from './app/controllers/CategoryController.js';
import OrderController from './app/controllers/OrderController.js';
import CreatePaymentIntentController from './app/controllers/CreatePaymentIntentController.js';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', sessionController.store);

routes.use(authMiddleware); // Aplica auth middleware para todas rotas abaixo desta linha \/

routes.post('/products', upload.single('file'), ProductController.store);
routes.put('/products/:id', upload.single('file'), ProductController.update);
routes.get('/products', ProductController.index);

routes.post('/categories', upload.single('file'), CategoryController.store);
routes.put('/categories/:id', upload.single('file'), CategoryController.update);
routes.get('/categories', CategoryController.index);

routes.post('/orders', OrderController.store);
routes.get('/orders', OrderController.index);
routes.put('/orders/:id', OrderController.update);

routes.post('/create-payment-intent', CreatePaymentIntentController.store);

export default routes;