import express from 'express';
import * as controller from '../controllers/board.js';
const router = express.Router();

router.get('/board/', controller.getBoard); //게시판 검색
export default router;
