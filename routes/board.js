import express from 'express';
import * as boardController from '../controllers/board.js';
const router = express.Router();

router.get('/boards/', boardController.getBoards); //게시판 검색
router.get('/board/:boardId', boardController.getBoardWithComment); // 원하는 게시판 조회 댓글 페이징 기능
router.put('/board/:boardId', boardController.increaseView); //게시판 조회수

export default router;
