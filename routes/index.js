import express from 'express';
import boardRouter from './board.js';

const router = express.Router();
router.use(boardRouter);

////////////TEST 코드///////////////
router.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});
////////////////////////////////////
export default router;
