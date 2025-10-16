import express from 'express';
import getRoute from './getRoutes.js';
import postRoute from './postRoutes.js';
import putRoute from './putRoutes.js';

const routes = express.Router();
routes.use('', getRoute);
routes.use('', postRoute);
routes.use('', putRoute);

export default routes;
