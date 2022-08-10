import express from 'express';
import boardRouter from './board.js';
import commentRouter from './comment.js';
import { specs, swaggerUi } from '../modules/swagger.js';

const router = express.Router();
router.use(boardRouter);
router.use(commentRouter);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

export default router;
